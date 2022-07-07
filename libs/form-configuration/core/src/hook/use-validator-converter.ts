import { ValidatorConverter } from "../api";
import { useValidatorConverterStore } from "../store/validator-converter-store";

export type UseValidatorConverter = () => {
  validatorConverters: ValidatorConverter[];
  set: (validatorConverters: ValidatorConverter[]) => void;
};

/**
 * A hook which simplifies the usage of the validator converter state.
 * Uses the internal {@link useValidatorConverterStore} hook for managing the validator converter state.
 *
 * @returns An array of options to access and set the validator converter state.
 */
export const useValidatorConverter: UseValidatorConverter = () => {
  const validatorConverters = useValidatorConverterStore((state) => state.validatorConverters);
  const set = useValidatorConverterStore((state) => state.set);

  return { validatorConverters, set };
};
