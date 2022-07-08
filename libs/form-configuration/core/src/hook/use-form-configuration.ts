import { useMemo } from "react";

import { FormConfiguration } from "../api";
import { FormConfigurationValidationConverter } from "../converter/FormConfigurationValidationConverter";
import { useFormConfigurationStore } from "../store/form-configuration-store";
import { useValidatorConverter } from "./use-validator-converter";

export type UseFormConfiguration = () => {
  formConfigurations: FormConfiguration[],
  formConfigurationLoaded: boolean;
  set: (formConfigurations: FormConfiguration[]) => void,
  add: (formConfiguration: FormConfiguration) => void,
  remove: (formConfiguration: FormConfiguration) => void
  setFormConfigurationLoaded: (formConfigurationLoaded: boolean) => void;
};

/**
 * A hook which simplifies the usage of the form configuration state.
 * Uses the internal {@link useFormConfigurationStore} hook for managing the form configuration state.
 *
 * @returns An array of options to access and set the form configuration state and remove or add a single form configuration.
 */
export const useFormConfiguration: UseFormConfiguration = () => {
  const formConfigurations = useFormConfigurationStore((state) => state.formConfigurations);
  const formConfigurationLoaded = useFormConfigurationStore((state) => state.formConfigurationLoaded);
  const set = useFormConfigurationStore((state) => state.set);
  const add = useFormConfigurationStore((state) => state.add);
  const remove = useFormConfigurationStore((state) => state.remove);
  const setFormConfigurationLoaded = useFormConfigurationStore((state) => state.setFormConfigurationLoaded);

  return {
    formConfigurations, formConfigurationLoaded, set, add, remove, setFormConfigurationLoaded,
  };
};

export const useYupFormConfiguration = (formId: string) => {
  const { formConfigurations } = useFormConfiguration();
  // load the additional validator converters
  const { validatorConverters } = useValidatorConverter();
  const formConfigurationValidationConverter = new FormConfigurationValidationConverter(validatorConverters);

  const searchedFormConfiguration = formConfigurations.find((formConfiguration) => formConfiguration.formId === formId);

  if (!searchedFormConfiguration && formConfigurations.length !== 0) {
    throw Error(`No form configuration found for given formId: ${formId}`);
  }

  return useMemo(() => {
    if (searchedFormConfiguration) {
      return formConfigurationValidationConverter.convertFormConfigurationToYupSchema(searchedFormConfiguration.constrainedPropertyConfigurationList);
    }
    return undefined;
  }, [formId]);
};
