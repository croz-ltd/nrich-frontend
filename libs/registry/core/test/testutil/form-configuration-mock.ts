/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

export const formConfigurationMock = [
  {
    formId: "net.croz.nrichdemobackend.registry.model.Country:::create",
    constrainedPropertyConfigurationList: [{
      path: "name",
      propertyType: "java.lang.String",
      javascriptType: "string",
      validatorList: [
        { name: "NotNull", argumentMap: {}, errorMessage: "Cannot be null" },
        {
          name: "Size",
          argumentMap: { min: 2, max: 500 },
          errorMessage: "Size must be between: 500 and 2",
        },
      ],
    }],
  },
  { formId: "net.croz.nrichdemobackend.registry.model.Country:::update", constrainedPropertyConfigurationList: [] },
  {
    formId: "net.croz.nrichdemobackend.registry.model.Address:::create",
    constrainedPropertyConfigurationList: [
      {
        path: "city",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "Size", argumentMap: { min: 2, max: 200 }, errorMessage: "Size must be between: 200 and 2" }],
      }, {
        path: "streetNumber",
        propertyType: "java.lang.Integer",
        javascriptType: "number",
        validatorList: [{ name: "Min", argumentMap: { value: 1 }, errorMessage: "Minimum value is: 1" }],
      }, {
        path: "street",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "Size", argumentMap: { min: 2, max: 200 }, errorMessage: "Size must be between: 200 and 2" }],
      },
    ],
  },
  {
    formId: "net.croz.nrichdemobackend.registry.model.Address:::update",
    constrainedPropertyConfigurationList: [
      {
        path: "city",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "Size", argumentMap: { min: 2, max: 200 }, errorMessage: "Size must be between: 200 and 2" }],
      }, {
        path: "streetNumber",
        propertyType: "java.lang.Integer",
        javascriptType: "number",
        validatorList: [{ name: "Min", argumentMap: { value: 1 }, errorMessage: "Minimum value is: 1" }],
      }, {
        path: "street",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "Size", argumentMap: { min: 2, max: 200 }, errorMessage: "Size must be between: 200 and 2" }],
      },
    ],
  },
  {
    formId: "net.croz.nrichdemobackend.registry.model.AuthorBook:::create",
    constrainedPropertyConfigurationList: [
      {
        path: "edition",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "NotNull", argumentMap: {}, errorMessage: "Cannot be null" }],
      }, {
        path: "editionNumber",
        propertyType: "java.lang.Integer",
        javascriptType: "number",
        validatorList: [{ name: "NotNull", argumentMap: {}, errorMessage: "Cannot be null" }],
      }],
  },
  {
    formId: "net.croz.nrichdemobackend.registry.model.AuthorBook:::update",
    constrainedPropertyConfigurationList: [
      {
        path: "edition",
        propertyType: "java.lang.String",
        javascriptType: "string",
        validatorList: [{ name: "NotNull", argumentMap: {}, errorMessage: "Cannot be null" }],
      }, {
        path: "editionNumber",
        propertyType: "java.lang.Integer",
        javascriptType: "number",
        validatorList: [{ name: "NotNull", argumentMap: {}, errorMessage: "Cannot be null" }],
      }],
  },
];
