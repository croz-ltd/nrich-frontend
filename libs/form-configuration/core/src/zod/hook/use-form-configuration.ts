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

import { FormZodConfiguration } from "../api";
import { useZodFormConfigurationStore } from "../store";

export type ZodFormConfigurationOptions = {
  /**
   * Array of current state form configurations.
   */
  formZodConfigurations: FormZodConfiguration[],
  /**
   * Flag that indicates whether form configuration is fetched from API.
   */
  formConfigurationLoaded: boolean;
  /**
   * Sets form configurations to state.
   * Use on initial call to find-all endpoint.
   * @param formConfigurations formConfigurations to set
   */
  set: (formConfigurations: FormZodConfiguration[]) => void,

  /**
   * Adds form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  add: (formConfiguration: FormZodConfiguration) => void,
  /**
   * Removes form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  remove: (formConfiguration: FormZodConfiguration) => void
  /**
   * Sets form configuration loaded to state.
   * @param isLoaded loaded flag to set
   */
  setFormConfigurationLoaded: (formConfigurationLoaded: boolean) => void;
};

export type UseZodFormConfiguration = () => ZodFormConfigurationOptions;

/**
 * A hook which simplifies the usage of the form configuration state.
 * Uses the internal {@link useZodFormConfigurationStore} hook for managing the form configuration state.
 *
 * @returns An array of options to access and set the form configuration state and remove or add a single form configuration.
 */
export const useZodFormConfigurationState: UseZodFormConfiguration = () => {
  const formZodConfigurations = useZodFormConfigurationStore((state) => state.zodFormConfigurations);
  const formConfigurationLoaded = useZodFormConfigurationStore((state) => state.formConfigurationLoaded);
  const set = useZodFormConfigurationStore((state) => state.set);
  const add = useZodFormConfigurationStore((state) => state.add);
  const remove = useZodFormConfigurationStore((state) => state.remove);
  const setFormConfigurationLoaded = useZodFormConfigurationStore((state) => state.setFormConfigurationLoaded);

  return {
    formZodConfigurations, formConfigurationLoaded, set, add, remove, setFormConfigurationLoaded,
  };
};

/**
 * A hook which extracts a specific Zod configuration from the form configuration identified by the form id.
 * Uses the internal {@link useZodFormConfigurationStore} hook for managing the form configuration state.
 *
 * @param formId Registered form id for a specific form configuration.
 *
 * @returns Mapped Zod configuration from the form configuration identified by the form id, or undefined if no matching form configuration is found.
 */
export const useZodFormConfiguration = (formId: string) => {
  const { formZodConfigurations } = useZodFormConfigurationState();

  const searchedFormConfiguration = formZodConfigurations.find((formZodConfiguration) => formZodConfiguration.formId === formId);

  if (!searchedFormConfiguration) {
    return undefined;
  }

  return searchedFormConfiguration.zodSchema as z.ZodObject<any>;
};
