import create from "zustand";

import { FormConfiguration } from "../api";

export interface FormConfigurationState {

  /**
   * Array of current state form configurations.
   */
  formConfigurations: FormConfiguration[];

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
}

/**
 * Creation of the API for managing internal form configuration state.
 * Used internally in the {@link useFormConfigurations} hook.
 *
 * @returns A hook for managing form configuration state usable in a React environment.
 */
export const useFormConfigurationStore = create<FormConfigurationState>((set) => ({
  formConfigurations: [],
  set: ((formConfigurations) => set({ formConfigurations })),
  add: (formConfiguration) => set((state) => ({
    formConfigurations: [...state.formConfigurations, { ...formConfiguration }],
  })),
  remove: (formConfiguration) => set((state) => ({
    formConfigurations: state.formConfigurations.filter((currentFormConfiguration) => currentFormConfiguration !== formConfiguration),
  })),
}));
