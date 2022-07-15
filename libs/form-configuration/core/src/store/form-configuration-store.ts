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

import create from "zustand";

import { FormYupConfiguration } from "../api";

export interface FormConfigurationState {

  /**
   * Array of current state form configurations.
   */
  formYupConfigurations: FormYupConfiguration[];

  /**
   * Flag that indicates weather form configuration is fetched from API.
   */
  formConfigurationLoaded: boolean;

  /**
   * Sets form configurations to state.
   * Use on initial call to find-all endpoint.
   * @param formConfigurations formConfigurations to set
   */
  set: (formYupConfigurations: FormYupConfiguration[]) => void;

  /**
   * Adds form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  add: (formYupConfiguration: FormYupConfiguration) => void;

  /**
   * Removes form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  remove: (formYupConfiguration: FormYupConfiguration) => void;

  /**
   * Sets form configuration loaded to state.
   * @param isLoaded loaded flag to set
   */
  setFormConfigurationLoaded: (formConfigurationLoaded: boolean) => void;
}

/**
 * Creation of the API for managing internal form configuration state.
 * Used internally in the {@link useFormConfiguration} hook.
 *
 * @returns A hook for managing form configuration state usable in a React environment.
 */
export const useFormConfigurationStore = create<FormConfigurationState>((set) => ({
  formYupConfigurations: [],
  formConfigurationLoaded: false,
  set: ((formYupConfigurations) => set((state) => ({
    ...state, formYupConfigurations,
  }))),
  add: (formYupConfiguration) => set((state) => ({
    formYupConfigurations: [...state.formYupConfigurations, { ...formYupConfiguration }],
  })),
  remove: (formYupConfiguration) => set((state) => ({
    formYupConfigurations: state.formYupConfigurations.filter((currentFormConfiguration) => currentFormConfiguration !== formYupConfiguration),
  })),
  setFormConfigurationLoaded: (formConfigurationLoaded) => set((state) => ({ ...state, formConfigurationLoaded })),
}));
