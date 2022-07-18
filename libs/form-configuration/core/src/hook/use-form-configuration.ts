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

import { FormYupConfiguration } from "../api";
import { useFormConfigurationStore } from "../store/form-configuration-store";

export type UseFormConfiguration = () => {
  formYupConfigurations: FormYupConfiguration[],
  formConfigurationLoaded: boolean;
  set: (formConfigurations: FormYupConfiguration[]) => void,
  add: (formConfiguration: FormYupConfiguration) => void,
  remove: (formConfiguration: FormYupConfiguration) => void
  setFormConfigurationLoaded: (formConfigurationLoaded: boolean) => void;
};

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

export const useYupFormConfiguration = (formId: string) => {
  const { formYupConfigurations } = useFormConfiguration();

  const searchedFormConfiguration = formYupConfigurations.find((formYupConfiguration) => formYupConfiguration.formId === formId);

  if (!searchedFormConfiguration) {
    throw Error(`No form configuration found for given formId: ${formId}`);
  }
  else {
    return searchedFormConfiguration.yupSchema;
  }
};
