import * as yup from "yup";

export interface FormConfiguration {

  /**
   * Registered form id for this form configuration.
   */
  formId: string;

  /**
   * List of {@link ConstrainedPropertyConfiguration} instances holding property configuration for each property defined in the class that form id was mapped to.
   */
  constrainedPropertyConfigurationList: ConstrainedPropertyConfiguration[];

}

export interface FormYupConfiguration {

  /**
   * Registered form id for this form configuration.
   */
  formId: string;

  /**
   * List of yup ObjectSchema instances holding property configuration for each property defined in the class that form id was mapped to.
   */
  yupSchema: yup.ObjectSchema<any>;

}

export interface ConstrainedPropertyConfiguration {

  /**
   * Path to the property relative to a parent class that is mapped to form id.
   */
  path: string;

  /**
   * Type of constrained property.
   */
  propertyType: string;

  /**
   * JavascriptType of constrained property.
   */
  javascriptType: string;

  /**
   * List of {@link ConstrainedPropertyClientValidatorConfiguration} instances that hold client side validation configuration.
   */
  validatorList: ConstrainedPropertyClientValidatorConfiguration[];

}

export interface ConstrainedPropertyClientValidatorConfiguration {

  /**
   * Constraint name (i.e. NotNull).
   */
  name: string;

  /**
   * Constraint arguments as a map.
   */
  argumentMap: Record<string, unknown>;

  /**
   * Error message that should be shown if validation fails.
   */
  errorMessage: string;

}

export interface ValidatorConverter {

  /**
   * Whether this ValidatorConverter supports conversion.
   * @param configuration configuration received from the server
   */
  supports(configuration: ConstrainedPropertyClientValidatorConfiguration): boolean;

  /**
   * Converts validation configuration to yup validator.
   * @param configuration configuration received from the server
   * @param validator yup validator
   */
  convert(configuration: ConstrainedPropertyClientValidatorConfiguration, validator: any): any;

}

export interface FormConfigurationConfiguration {

  /**
   * Url where to fetch configuration from. It represents the part of the path till /fetch-all.
   */
  url: string;

  /**
   * Additional configuration options to send with fetch request i.e. if some authentication information is required.
   */
  requestOptionsResolver?: () => Record<string, string>;

  /**
   * Additional converters to use for custom constraints.
   */
  additionalValidatorConverters?: ValidatorConverter[];

}
