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
