import create from "zustand";

import { FormConfiguration } from "../api";

export interface FormConfigurationState {

  /**
   * Array of current state form configurations.
   */
  formConfigurations: FormConfiguration[];

  /**
   * Flag that indicates weather form configuration is fetched from API.
   */
  formConfigurationLoaded: boolean;

  /**
   * Sets form configurations to state.
   * Use on initial call to find-all endpoint.
   * @param formConfigurations formConfigurations to set
   */
  set: (formConfigurations: FormConfiguration[]) => void;

  /**
   * Adds form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  add: (formConfiguration: FormConfiguration) => void;

  /**
   * Removes form configuration to state.
   * @param formConfiguration formConfiguration to add
   */
  remove: (formConfiguration: FormConfiguration) => void;

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
  formConfigurations: [],
  formConfigurationLoaded: false,
  set: ((formConfigurations) => set((state) => ({
    ...state, formConfigurations,
  }))),
  add: (formConfiguration) => set((state) => ({
    formConfigurations: [...state.formConfigurations, { ...formConfiguration }],
  })),
  remove: (formConfiguration) => set((state) => ({
    formConfigurations: state.formConfigurations.filter((currentFormConfiguration) => currentFormConfiguration !== formConfiguration),
  })),
  setFormConfigurationLoaded: (formConfigurationLoaded) => set((state) => ({ ...state, formConfigurationLoaded })),
}));
