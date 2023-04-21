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

import React from "react";
import * as yup from "yup";

import { FormType, RegistryEntityConfiguration } from "../api";
import { RegistryEntityContext } from "../component";
import { resolveValue } from "../util";
import { useRegistryEntityYupFormConfiguration } from "./use-registry-entity-form-configuration";

/**
 * Return value of {@link useRegistryForm}. Contains configuration part of the form, with initial values, while leaving user to
 * handle form changes and errors.
 */
interface UseRegistryForm {
  /**
   * Configuration of wanted entity
   */
  entityConfiguration: RegistryEntityConfiguration;

  /**
   * Validation schema of the form
   */
  yupSchema: yup.ObjectSchema<any>;

  /**
   * Flattened initial values for easier access in form.
   */
  finalInitialValues: any;

  /**
   * Properties to be shown in the form.
   */
  properties,
}

/**
 * Helper hook used in registry forms. Returns initial data and configuration to be used in the form.
 * @param initialValues initial values of the form. Row data for update and empty object for create form.
 * @param type type of the form (update or create)
 */
export const useRegistryForm = (initialValues: any, type: FormType): UseRegistryForm => {
  const { entityConfiguration, finalProperties } = React.useContext(RegistryEntityContext);
  const yupSchema = useRegistryEntityYupFormConfiguration(entityConfiguration.classFullName, type);
  const finalInitialValues = React.useMemo(() => {
    if (initialValues === undefined) {
      const values = {};
      finalProperties.forEach((property) => {
        values[property.name] = null;
      });
      return values;
    }
    const values = {};
    finalProperties.forEach((property) => {
      values[property.name] = resolveValue(property, initialValues);
    });
    return values;
  }, [initialValues]);

  const properties = type === "update" ? finalProperties : finalProperties.filter((property) => property.editable);

  return {
    entityConfiguration,
    yupSchema,
    finalInitialValues,
    properties,
  };
};
