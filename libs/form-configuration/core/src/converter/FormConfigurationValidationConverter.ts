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

import _mergeWith from "lodash/mergeWith";
import * as yup from "yup";

import { ConstrainedPropertyClientValidatorConfiguration, ConstrainedPropertyConfiguration, ValidatorConverter } from "../api";

/**
 * Converter responsible for conversion between ConstrainedPropertyConfiguration array (that contains validations specified and received from the backend)
 * and Yup's ObjectSchema that can be applied on the frontend. The list of supported conversions is in given in {@link FormConfigurationValidationConverter.DEFAULT_CONVERTER_LIST} but
 * users can also provide their own by using {@link ValidatorConverter} interface and supplying them in the constructor.
 * The last validator converter will match any backend constraint and try to map it directly to Yup.
 */
export class FormConfigurationValidationConverter {
  private static PATH_SEPARATOR = ".";

  private static DEFAULT_CONVERTER_LIST: ValidatorConverter[] = [
    {
      supports: (configuration) => ["NotNull", "NotBlank", "NotEmpty"].includes(configuration.name),
      convert: (configuration, validator) => validator.required(configuration.errorMessage),
    },
    {
      supports: (configuration) => ["Size", "Length"].includes(configuration.name),
      convert: (configuration, validator) => validator.min(configuration.argumentMap.min, configuration.errorMessage).max(configuration.argumentMap.max, configuration.errorMessage),
    },
    {
      supports: (configuration) => ["Pattern"].includes(configuration.name),
      convert: (configuration, validator) => validator.matches(configuration.argumentMap.pattern, configuration.errorMessage),
    },
    {
      supports: (configuration) => ["Min", "Max"].includes(configuration.name),
      convert: (configuration, validator) => validator[configuration.name.toLowerCase()](configuration.argumentMap.value, configuration.errorMessage),
    },
    {
      supports: (configuration) => ["InList"].includes(configuration.name),
      convert: (configuration, validator) => validator.test("inList", configuration.errorMessage, (value) => (configuration.argumentMap.value as string[]).includes(value)),
    },
    {
      supports: () => true,
      convert: (configuration, validator) => validator[configuration.name.toLowerCase()](configuration.errorMessage),
    },
  ];

  /**
   * Additional converters that can be registered for unsupported conversion or to change one of the existing conversions (they take precedence to builtin converters).
   * @private
   */
  private readonly additionalConverters: ValidatorConverter[];

  constructor(additionalConverters: ValidatorConverter[] = []) {
    this.additionalConverters = additionalConverters;
  }

  /**
   * Converts {@link ConstrainedPropertyConfiguration} array to Yup's schema using builtin and provided converters.
   * @param constrainedPropertyConfigurationList array of {@link ConstrainedPropertyConfiguration} to convert
   */
  convertFormConfigurationToYupSchema(constrainedPropertyConfigurationList: ConstrainedPropertyConfiguration[]): yup.ObjectSchema<any> {
    return this.convertFormConfigurationToYupSchemaInternal(constrainedPropertyConfigurationList);
  }

  private convertFormConfigurationToYupSchemaInternal(constrainedPropertyConfigurationList: ConstrainedPropertyConfiguration[]) {
    let schema = yup.object().shape({});

    constrainedPropertyConfigurationList.forEach((property) => {
      const yupValidation = yup[property.javascriptType];

      if (!yupValidation) {
        return;
      }

      const validator = property.validatorList
        .reduce((previousValidator, validatorConfiguration) => this.applyConverter(validatorConfiguration, previousValidator), yupValidation().default(undefined).nullable());
      const [propertyName, restOfPathList] = FormConfigurationValidationConverter.convertPath(property.path);

      if (restOfPathList.length > 0) {
        const currentPathSchema = [...restOfPathList].reverse()
          .reduce((currentShape, path) => ({ [path]: yup.object().shape(currentShape).default(undefined).nullable() }), { [propertyName]: validator });

        schema = this.mergeSchemas(schema, yup.object().shape(currentPathSchema));
      }
      else {
        const currentPropertySchema = yup.object().shape({ [propertyName]: validator });

        schema = schema.concat(currentPropertySchema);
      }
    });

    return schema;
  }

  // Function to recursively merge two Yup schemas
  mergeSchemas(schema1: yup.ObjectSchema<any>, schema2: yup.ObjectSchema<any>) {
    // Recursive helper function to merge two schema objects
    const mergeObjects = (obj1, obj2) => {
      const merged = { ...obj1 };

      Object.keys(obj2).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(merged, key)) {
          // If both properties are objects, merge recursively
          if (obj1[key].type === "object" && obj2[key].type === "object") {
            merged[key] = this.mergeSchemas(obj1[key], obj2[key]);
            merged[key].spec = _mergeWith(obj1[key].spec, obj2[key].spec, (field1, field2) => (typeof field1 === "boolean" ? field1 && field2 : field1 ?? field2));
          }
          else if (obj1[key].type === "array" && obj2[key].type === "array") {
            if (obj1[key].innerType.type === "object" && obj2[key].innerType.type === "object") {
              merged[key] = yup.array().of(this.mergeSchemas(obj1[key].innerType, obj2[key].innerType));
            }
            else {
              merged[key] = yup.array().of(obj2[key].innerType);
            }
          }
          else {
            merged[key] = obj2[key];
          }
        }
        else {
          // Otherwise, add the property to the merged object
          merged[key] = obj2[key];
        }
      });

      return merged;
    };

    // Extract the fields of schema1
    const fields1 = schema1.fields;

    // Extract the fields of schema2
    const fields2 = schema2.fields;

    // Merge the fields recursively
    const mergedFields = mergeObjects(fields1, fields2);

    // Create a new merged schema
    return yup.object().shape(mergedFields);
  }

  private applyConverter(validatorConfiguration: ConstrainedPropertyClientValidatorConfiguration, validator: any): any {
    const converter = this.resolveConverter(validatorConfiguration);
    let resolvedValidator = validator;

    if (converter) {
      try {
        resolvedValidator = converter.convert(validatorConfiguration, validator);
      }
      catch (ignore) {
        // constraint is not registered so skip evaluation
      }
    }

    return resolvedValidator;
  }

  private resolveConverter(validatorConfiguration: ConstrainedPropertyClientValidatorConfiguration) {
    const allConverters = this.additionalConverters.concat(FormConfigurationValidationConverter.DEFAULT_CONVERTER_LIST);

    return allConverters.find((additionalConverter) => additionalConverter.supports(validatorConfiguration));
  }

  private static convertPath(path: string): [string, string[]] {
    const pathList = path.split(this.PATH_SEPARATOR);
    const propertyName = pathList[pathList.length - 1];

    pathList.pop();

    return [propertyName, pathList];
  }
}
