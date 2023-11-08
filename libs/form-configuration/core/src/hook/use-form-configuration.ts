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

import { ObjectSchema } from "yup";

import { FormYupConfiguration } from "../api";
import { useFormConfigurationStore } from "../store";

export type FormConfigurationOptions = {
  /**
   * Array of current state form configurations.
   */
  formYupConfigurations: FormYupConfiguration[],
  /**
   * Flag that indicates weather form configuration is fetched from API.
   */
  formConfigurationLoaded: boolean;
  /**
   * Sets form configurations to state.
   * Use on initial call to find-all endpoint.
   * @param formConfigurations formConfigurations to set
   */
  set: (formConfigurations: FormYupConfiguration[]) => void,

  /**
   * Adds form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  add: (formConfiguration: FormYupConfiguration) => void,
  /**
   * Removes form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  remove: (formConfiguration: FormYupConfiguration) => void
  /**
   * Sets form configuration loaded to state.
   * @param isLoaded loaded flag to set
   */
  setFormConfigurationLoaded: (formConfigurationLoaded: boolean) => void;
};

export type UseFormConfiguration = () => FormConfigurationOptions;

/**
 * A hook which simplifies the usage of the form configuration state.
 * Uses the internal {@link useFormConfigurationStore} hook for managing the form configuration state.
 *
 * @returns An array of options to access and set the form configuration state and remove or add a single form configuration.
 */
export const useFormConfiguration: UseFormConfiguration = () => {
  const formYupConfigurations = useFormConfigurationStore((state) => state.formYupConfigurations);
  const formConfigurationLoaded = useFormConfigurationStore((state) => state.formConfigurationLoaded);
  const set = useFormConfigurationStore((state) => state.set);
  const add = useFormConfigurationStore((state) => state.add);
  const remove = useFormConfigurationStore((state) => state.remove);
  const setFormConfigurationLoaded = useFormConfigurationStore((state) => state.setFormConfigurationLoaded);

  return {
    formYupConfigurations, formConfigurationLoaded, set, add, remove, setFormConfigurationLoaded,
  };
};

/**
 * A hook which extracts a specific Yup configuration from the form configuration identified by the form id.
 * Uses the internal {@link useFormConfigurationStore} hook for managing the form configuration state.
 *
 * @param formId Registered form id for a specific form configuration.
 *
 * @returns Mapped Yup configuration from the form configuration identified by the form id, or undefined if no matching form configuration is found.
 */
export const useYupFormConfiguration = <T extends Record<string, any> = any>(formId: string) => {
  const { formYupConfigurations } = useFormConfiguration();

  const searchedFormConfiguration = formYupConfigurations.find((formYupConfiguration) => formYupConfiguration.formId === formId);

  if (!searchedFormConfiguration) {
    return undefined;
  }

  return searchedFormConfiguration.yupSchema as ObjectSchema<T>;
};
