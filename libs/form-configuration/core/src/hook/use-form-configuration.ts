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
