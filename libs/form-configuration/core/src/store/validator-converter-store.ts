import create from "zustand";

import { ValidatorConverter } from "../api";

export interface ValidatorConverterState {

  /**
   * Array of current state validator converters.
   */
  validatorConverters: ValidatorConverter[];

  /**
   * Sets validator converters to state.
   * @param validatorConverters formConfigurations to set
   */
  set: (validatorConverters: ValidatorConverter[]) => void;

}

/**
 * Creation of the API for managing internal validator converters state.
 * Used internally in the {@link useValidatorConverter} hook.
 *
 * @returns A hook for managing validator converters state usable in a React environment.
 */
export const useValidatorConverterStore = create<ValidatorConverterState>((set) => ({
  validatorConverters: [],
  set: ((validatorConverters) => set({ validatorConverters })),
}));
