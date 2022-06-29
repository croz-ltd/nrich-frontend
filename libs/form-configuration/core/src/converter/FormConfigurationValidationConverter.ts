import * as yup from "yup";

import { ConstrainedPropertyClientValidatorConfiguration, ConstrainedPropertyConfiguration, ValidatorConverter } from "../api";

export class FormConfigurationValidationConverter {
  private static PATH_SEPARATOR = ".";

  private static DEFAULT_CONVERTER_LIST: ValidatorConverter[] = [
    {
      supports: (configuration) => ["NotNull", "NotBlank", "NotEmpty"].includes(configuration.name),
      convert: (configuration, validator) => validator.required(configuration.errorMessage),
    },
    {
      supports: (configuration) => ["Size", "Length"].includes(configuration.name),
      convert: (configuration, validator) => validator.min(configuration.argumentMap.min, configuration.errorMessage)
        .max(configuration.argumentMap.max, configuration.errorMessage),
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

  private readonly additionalConverters: ValidatorConverter[];

  constructor(additionalConverters: ValidatorConverter[] = []) {
    this.additionalConverters = additionalConverters;
  }

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

      const validator = property.validatorList.reduce((previousValidator, validatorConfiguration) => this.applyConverter(validatorConfiguration, previousValidator), yupValidation());

      const [propertyName, restOfPathList] = FormConfigurationValidationConverter.convertPath(property.path);
      const currentPropertySchema = yup.object().shape({ [propertyName]: validator });

      if (restOfPathList.length > 0) {
        const currentPathSchema = [...restOfPathList].reverse()
          .reduce((currentShape, path) => ({ [path]: yup.object().shape(currentShape) }), { [propertyName]: validator });

        schema = schema.concat(yup.object().shape(currentPathSchema));
      }
      else {
        schema = schema.concat(currentPropertySchema);
      }
    });

    return schema;
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
