import { FormConfiguration, ValidatorConverter } from "../../dist";

export const invalidValidationConfiguration = () => [
  {
    path: "type",
    propertyType: "net.croz.Type",
    javascriptType: "unknown",
    validatorList: [
      {
        name: "NotEmpty",
        argumentMap: {},
        errorMessage: "Type cannot be empty",
      },
    ],
  },
  {
    path: "number",
    propertyType: "java.lang.Integer",
    javascriptType: "number",
    validatorList: [
      {
        name: "Pattern",
        argumentMap: { pattern: "[0-9]+" },
        errorMessage: "Number must contain only digits",
      },
    ],
  },
];

export const createSimpleValidationList = () => [
  {
    path: "username",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "NotBlank",
        argumentMap: {},
        errorMessage: "Username cannot be blank",
      },
    ],
  },
];

export const createComplexValidationList = () => [
  {
    path: "name",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "Pattern",
        argumentMap: { pattern: "[a-zA-Z]+" },
        errorMessage: "Name must contain only letters",
      },
      {
        name: "Size",
        argumentMap: { min: 3, max: 10 },
        errorMessage: "Name must have minimum 3 and maximum 10 characters",
      },
    ],
  },
  {
    path: "age",
    propertyType: "java.lang.Integer",
    javascriptType: "number",
    validatorList: [
      {
        name: "Min",
        argumentMap: { value: 21 },
        errorMessage: "Minimum age is 21",
      },
      {
        name: "Max",
        argumentMap: { value: 110 },
        errorMessage: "Maximum age is 110",
      },
    ],
  },
];

export const createNestedValidationList = () => [
  {
    path: "user.username",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "NotBlank",
        argumentMap: {},
        errorMessage: "Username cannot be blank",
      },
    ],
  },
  {
    path: "user.address.street",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "NotBlank",
        argumentMap: {},
        errorMessage: "Street cannot be blank",
      },
    ],
  },
  {
    path: "user.address.city",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "NotBlank",
        argumentMap: {},
        errorMessage: "City cannot be blank",
      },
    ],
  },
  {
    path: "user.email",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "Email",
        argumentMap: {},
        errorMessage: "Not a valid email",
      },
    ],
  },
];

export const createCustomValidationList = () => [
  {
    path: "title",
    propertyType: "java.lang.String",
    javascriptType: "string",
    validatorList: [
      {
        name: "InList",
        argumentMap: {
          value: ["mr", "mrs", "miss"],
        },
        errorMessage: "Not in list: mr, mrs, miss",
      },
    ],
  },
];

export const mockFormConfiguration: FormConfiguration = {
  formId: "form-configuration.demo-request",
  constrainedPropertyConfigurationList: [
    {
      path: "firstName",
      propertyType: "java.lang.String",
      javascriptType: "string",
      validatorList: [
        {
          name: "NotBlank",
          argumentMap: {},
          errorMessage: "Cannot be blank",
        },
      ],
    },
    {
      path: "phone",
      propertyType: "java.lang.String",
      javascriptType: "string",
      validatorList: [
        {
          name: "Size",
          argumentMap: {
            min: 5,
            max: 9,
          },
          errorMessage: "Size must be between: 9 and 5",
        },
      ],
    },
    {
      path: "startDate",
      propertyType: "java.time.Instant",
      javascriptType: "date",
      validatorList: [
        {
          name: "NotNull",
          argumentMap: {},
          errorMessage: "Cannot be null",
        },
      ],
    },
    {
      path: "hours",
      propertyType: "java.lang.Integer",
      javascriptType: "number",
      validatorList: [
        {
          name: "Min",
          argumentMap: {
            value: 0,
          },
          errorMessage: "Minimum value is: 0",
        },
        {
          name: "Max",
          argumentMap: {
            value: 23,
          },
          errorMessage: "Maximum value is: 23",
        },
      ],
    },
    {
      path: "income",
      propertyType: "java.math.BigDecimal",
      javascriptType: "number",
      validatorList: [
        {
          name: "Digits",
          argumentMap: {
            integer: 10,
            fraction: 2,
          },
          errorMessage: "Maximum number of digits is: 10 and scale is: 2",
        },
        {
          name: "DecimalMin",
          argumentMap: {
            inclusive: true,
            value: "0.0",
          },
          errorMessage: "Income must be greater than zero",
        },
      ],
    },
    {
      path: "endDate",
      propertyType: "java.time.Instant",
      javascriptType: "date",
      validatorList: [
        {
          name: "NotNull",
          argumentMap: {},
          errorMessage: "Cannot be null",
        },
      ],
    },
    {
      path: "phonePrefix",
      propertyType: "java.lang.String",
      javascriptType: "string",
      validatorList: [
        {
          name: "Size",
          argumentMap: {
            min: 3,
            max: 3,
          },
          errorMessage: "Size must be between: 3 and 3",
        },
      ],
    },
  ],
};

export const mockFormConfigurations: FormConfiguration[] = [
  {
    formId: "form-configuration.demo-request",
    constrainedPropertyConfigurationList: [
      {
        path: "firstName",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "NotBlank",
            argumentMap: {},
            errorMessage: "Cannot be blank",
          },
        ],
      },
      {
        path: "phone",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "Size",
            argumentMap: {
              min: 5,
              max: 9,
            },
            errorMessage: "Size must be between: 9 and 5",
          },
        ],
      },
      {
        path: "startDate",
        propertyType: "java.time.Instant",
        javascriptType: "date",
        validatorList: [
          {
            name: "NotNull",
            argumentMap: {},
            errorMessage: "Cannot be null",
          },
        ],
      },
      {
        path: "hours",
        propertyType: "java.lang.Integer",
        javascriptType: "number",
        validatorList: [
          {
            name: "Min",
            argumentMap: {
              value: 0,
            },
            errorMessage: "Minimum value is: 0",
          },
          {
            name: "Max",
            argumentMap: {
              value: 23,
            },
            errorMessage: "Maximum value is: 23",
          },
        ],
      },
      {
        path: "income",
        propertyType: "java.math.BigDecimal",
        javascriptType: "number",
        validatorList: [
          {
            name: "Digits",
            argumentMap: {
              integer: 10,
              fraction: 2,
            },
            errorMessage: "Maximum number of digits is: 10 and scale is: 2",
          },
          {
            name: "DecimalMin",
            argumentMap: {
              inclusive: true,
              value: "0.0",
            },
            errorMessage: "Income must be greater than zero",
          },
        ],
      },
      {
        path: "endDate",
        propertyType: "java.time.Instant",
        javascriptType: "date",
        validatorList: [
          {
            name: "NotNull",
            argumentMap: {},
            errorMessage: "Cannot be null",
          },
        ],
      },
      {
        path: "phonePrefix",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "Size",
            argumentMap: {
              min: 3,
              max: 3,
            },
            errorMessage: "Size must be between: 3 and 3",
          },
        ],
      },
    ],
  }, {
    formId: "form-configuration.demo-request-copy",
    constrainedPropertyConfigurationList: [
      {
        path: "title",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "InList",
            argumentMap: {
              value: [
                "mr",
                "mrs",
                "miss",
              ],
            },
            errorMessage: "Not in list: mr, mrs, miss",
          },
        ],
      },
      {
        path: "email",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "Email",
            argumentMap: {
              regexp: ".*",
              flags: [],
            },
            errorMessage: "Email is not in the correct format",
          },
          {
            name: "NotBlank",
            argumentMap: {},
            errorMessage: "Email cannot be empty",
          },
        ],
      },
      {
        path: "nestedFormConfigurationDemoRequest",
        propertyType: "net.croz.nrichdemobackend.formconfiguration.request.NestedFormConfigurationDemoRequest",
        javascriptType: "object",
        validatorList: [
          {
            name: "NotNull",
            argumentMap: {},
            errorMessage: "Cannot be null",
          },
        ],
      },
      {
        path: "nestedFormConfigurationDemoRequest.country",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "Size",
            argumentMap: {
              min: 2,
              max: 100,
            },
            errorMessage: "Country is not correctly defined",
          },
        ],
      },
      {
        path: "nestedFormConfigurationDemoRequest.city",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "Size",
            argumentMap: {
              min: 2,
              max: 150,
            },
            errorMessage: "City is not correctly defined",
          },
        ],
      },
      {
        path: "nestedFormConfigurationDemoRequest.street",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [
          {
            name: "NotNull",
            argumentMap: {},
            errorMessage: "Cannot be null",
          },
        ],
      },
    ],
  },
];

export const mockValidatorConverters: ValidatorConverter[] = [
  {
    supports: (configuration) => ["NotNull", "NotBlank", "NotEmpty"].includes(configuration.name),
    convert: (configuration, validator) => validator.required(configuration.errorMessage),
  },
  {
    supports: (configuration) => ["Size", "Length"].includes(configuration.name),
    convert: (configuration, validator) => validator.min(configuration.argumentMap.min, configuration.errorMessage)
      .max(configuration.argumentMap.max, configuration.errorMessage),
  },
];
