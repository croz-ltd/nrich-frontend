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
