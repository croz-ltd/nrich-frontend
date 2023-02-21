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

import { RegistryEntityConfiguration } from "../api";

/**
 * Returns an id representation for given entity configuration and data. Can be single value (e.g. when id is numeric) or an object
 * when embedded id or id class is used
 * @param entityConfiguration
 * @param data
 */
export const resolveId = (entityConfiguration, data) => {
  if (entityConfiguration.idClassIdentity) {
    const id = {};
    entityConfiguration.idClassPropertyNameList.forEach((property) => {
      id[property.name] = data[property.name];
    });
    return id;
  }
  const idField = entityConfiguration.propertyConfigurationList.find((property) => property.id === true);
  return data[idField.name];
};

/**
 * Resolves a value for flat property from nested data.
 * @param propertyConfiguration
 * @param data
 */
export const resolveValue = (propertyConfiguration, data) => {
  const fieldPath = propertyConfiguration.name;
  if (fieldPath.includes(".")) {
    let current = data;
    fieldPath.split(".").forEach((fieldPathPart) => {
      current = current[fieldPathPart];
    });
    return current;
  }
  return data[fieldPath];
};

/**
 * Rearranges object from flat structure to nested one, e.g.
 *  { "id.author": { "id": 1 }, "id.book": { "id": 3 }, "edition": "First edition" } to
 *  { "id": { "author": { "id": 1 }, "book": { "id": 3 } }, "edition": "First edition" }
 *  @param value form value for submission
 */
export const restructureSubmitValue = (value) => {
  const result = {};
  Object.keys(value).forEach((key) => {
    if (key.includes(".")) {
      let current = result;
      key.split(".").forEach((fieldPathPart, i, arr) => {
        if (i === arr.length - 1) {
          current[fieldPathPart] = value[key];
        }
        else {
          current[fieldPathPart] = { ...(current[fieldPathPart] ?? {}) };
          current = current[fieldPathPart];
        }
      });
    }
    else {
      result[key] = value[key];
    }
  });
  return result;
};

/**
 * Formats id field as Class[id=3]. Used as default for rendering objects
 * @param classFullName full name of class for formatting
 * @param idFieldName name of the id field
 * @param id value of the id field
 */
export const formatIdName = (classFullName: string, idFieldName: string, id: any) => `${classFullName.split(".").pop()}[${idFieldName}=${id}]`;

/**
 * Returns id field of the configuration, used when entity does not have embedded id nor id class.
 * @param entityConfiguration configuration of the registry entity
 */
export const findIdField = (entityConfiguration: RegistryEntityConfiguration) => entityConfiguration.propertyConfigurationList.find((property) => property.id);
