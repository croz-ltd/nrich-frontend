/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import { z } from "zod";

import {
  ConstrainedPropertyClientValidatorConfiguration,
  ConstrainedPropertyConfiguration,
  FormConfiguration,
  ValidatorConverter,
} from "../../shared/api";

/**
 * Converter responsible for conversion between ConstrainedPropertyConfiguration array (that contains validations specified and received from the backend)
 * and Zod's schema that can be applied on the frontend. The list of supported conversions is in given in {@link FormConfigurationValidationZodConverter.DEFAULT_CONVERTER_LIST} but
 * users can also provide their own by using {@link ValidatorConverter} interface and supplying them in the constructor.
 * The last validator converter will match any backend constraint and try to map it directly to Yup.
 */
export class FormConfigurationValidationZodConverter {
  /**
   * Additional converters that can be registered for unsupported conversion or to change one of the existing conversions (they take precedence to builtin converters).
   * @private
   */
  private readonly additionalConverters: ValidatorConverter[];

  constructor(additionalConverters: ValidatorConverter[] = []) {
    this.additionalConverters = additionalConverters;
  }

  /**
   * Converts {@link FormConfiguration} to Zod's schema using builtin and provided converters.
   * @param formConfig Form configuration to convert
   */
  public convertFormConfigurationToZodSchema(formConfig: FormConfiguration): z.ZodObject<any> {
    const shape: Record<string, z.ZodTypeAny> = {};

    formConfig.constrainedPropertyConfigurationList.forEach(
      (property: ConstrainedPropertyConfiguration) => {
        let fieldSchema = FormConfigurationValidationZodConverter.getBaseSchema(property);

        let isRequired = false;
        let lastRequiredValidator: ConstrainedPropertyClientValidatorConfiguration | undefined;

        property.validatorList.forEach(
          (validator: ConstrainedPropertyClientValidatorConfiguration) => {
            if (["NotNull", "NotBlank", "NotEmpty"].includes(validator.name)) {
              isRequired = true;
              lastRequiredValidator = validator;
            }
            fieldSchema = this.applyConverter(validator, fieldSchema);
          },
        );

        if (!isRequired) {
          fieldSchema = fieldSchema.nullish();
        }
        else {
          fieldSchema = fieldSchema
            .nullable()
            .or(z.undefined())
            .refine(
              (val: any) => val != null,
              { message: lastRequiredValidator!.errorMessage },
            );
        }

        FormConfigurationValidationZodConverter.setNestedField(shape, property.path.split("."), fieldSchema);
      },
    );

    return FormConfigurationValidationZodConverter.buildZodObject(shape);
  }

  /**
   * Determines the base Zod schema for a constrained property based on
   * its declared JavaScript type.
   */
  private static getBaseSchema(property: ConstrainedPropertyConfiguration): z.ZodTypeAny {
    switch (property.javascriptType.toLowerCase()) {
      case "string":
        return z.string();
      case "number":
        return z.number();
      case "boolean":
        return z.boolean();
      case "object":
        return z.record(z.string(), z.any());
      case "array":
        return z.array(z.any());
      case "date":
        return z.date();
      default:
        return z.unknown();
    }
  }

  /**
   * Assigns a Zod schema to a nested path inside a JS object that represents the shape of the final Zod object.
   */
  private static setNestedField(
    shape: Record<string, any>,
    path: string[],
    schema: z.ZodTypeAny,
  ) {
    let current = shape;

    for (let i = 0; i < path.length - 1; i += 1) {
      const key = path[i];

      if (!(key in current)) {
        current[key] = {};
      }

      current = current[key];
    }

    current[path[path.length - 1]] = schema;
  }

  /**
   * Recursively converts a nested shape object into a real ZodObject.
   */
  private static buildZodObject(
    shape: Record<string, any>,
  ): z.ZodObject<any> {
    const zodShape: Record<string, z.ZodTypeAny> = {};

    Object.entries(shape).forEach(([key, value]) => {
      if (value instanceof z.ZodType) {
        zodShape[key] = value;
      }
      else {
        zodShape[key] = FormConfigurationValidationZodConverter.buildZodObject(value);
      }
    });

    return z.object(zodShape);
  }

  private applyConverter(
    config: ConstrainedPropertyClientValidatorConfiguration,
    schema: z.ZodTypeAny,
  ): z.ZodTypeAny {
    const converter = this.resolveConverter(config);
    if (converter) {
      try {
        return converter.convert(config, schema) as z.ZodTypeAny;
      }
      catch {
        // constraint is not registered so skip evaluation
      }
    }
    return schema;
  }

  private resolveConverter(
    config: ConstrainedPropertyClientValidatorConfiguration,
  ): ValidatorConverter | undefined {
    const allConverters = this.additionalConverters.concat(FormConfigurationValidationZodConverter.DEFAULT_CONVERTERS_LIST);
    return allConverters.find((additionalConverter) => additionalConverter.supports(config));
  }

  private static readonly DEFAULT_CONVERTERS_LIST: ValidatorConverter[] = [
    {
      supports: (configuration) => ["NotNull", "NotBlank", "NotEmpty"].includes(configuration.name),
      convert: (configuration, schema: any) => {
        if (configuration.name === "NotBlank" && schema instanceof z.ZodString) {
          return schema.refine(
            (val: any) => val == null || (typeof val === "string" && val.trim().length > 0),
            { message: configuration.errorMessage },
          );
        }
        if (configuration.name === "NotEmpty") {
          if (schema instanceof z.ZodString) {
            return schema.refine(
              (val: any) => val == null || (typeof val === "string" && val.length > 0),
              { message: configuration.errorMessage },
            );
          }
          if (schema instanceof z.ZodArray) {
            return schema.refine(
              (val: any) => val == null || val.length > 0,
              { message: configuration.errorMessage },
            );
          }
        }
        // NotNull - no additional check needed, handled at the end
        return schema;
      },
    },
    {
      supports: (configuration) => ["Size", "Length"].includes(configuration.name),
      convert: (configuration, schema: any) => {
        if (schema instanceof z.ZodString || schema instanceof z.ZodArray) {
          let s = schema;
          if (configuration.argumentMap.min != null) s = s.min(configuration.argumentMap.min as number, { message: configuration.errorMessage });
          if (configuration.argumentMap.max != null) s = s.max(configuration.argumentMap.max as number, { message: configuration.errorMessage });
          return s;
        }
        return schema;
      },
    },
    {
      supports: (configuration) => configuration.name === "Pattern",
      convert: (configuration, schema: any) => {
        if (!(schema instanceof z.ZodString)) {
          return schema;
        }

        const patternStr = configuration.argumentMap.pattern;
        if (typeof patternStr !== "string" || patternStr.trim() === "") {
          return schema;
        }

        let regex: RegExp;
        try {
          regex = new RegExp(patternStr);
        }
        catch {
          return schema;
        }

        return schema.regex(regex, { message: configuration.errorMessage });
      },
    },
    {
      supports: (configuration) => ["Min", "Max"].includes(configuration.name),
      convert: (configuration, schema: any) => {
        if (!(schema instanceof z.ZodNumber) || configuration.argumentMap.value == null) return schema;
        const value = configuration.argumentMap.value as number;
        return configuration.name === "Min"
          ? schema.min(value, { message: configuration.errorMessage })
          : schema.max(value, { message: configuration.errorMessage });
      },
    },
    {
      supports: (configuration) => configuration.name === "InList",
      convert: (config, schema: any) => {
        const values = config.argumentMap.value;
        if (Array.isArray(values)) {
          return schema.refine(
            (val: any) => values.includes(val),
            { message: config.errorMessage },
          );
        }
        return schema;
      },
    },
    {
      supports: (configuration) => configuration.name === "Email",
      convert: (configuration, schema: any) => {
        if (!(schema instanceof z.ZodString)) {
          return schema;
        }
        return z.email(configuration.errorMessage);
      },
    },
    {
      supports: () => true,
      convert: (_, schema: any) => schema,
    },
  ];
}
