import { FormConfiguration, FormConfigurationConfiguration } from "../api";
import { useFormConfigurationStore } from "../store/form-configuration-store";
import { useValidatorConverterStore } from "../store/validator-converter-store";

export const fetchFormConfigurations = async ({ url, requestOptionsResolver, additionalValidatorConverters }: FormConfigurationConfiguration): Promise<FormConfiguration[]> => {
  const response = await fetch(`${url}/fetch-all`, {
    method: "POST",
    headers: { ...requestOptionsResolver },
  });
  const body = await response.json();

  // set the response to the form configuration store
  if (response.ok) {
    useFormConfigurationStore.getState().set(body);
    useFormConfigurationStore.getState().setFormConfigurationLoaded(true);
  }
  // set additional validator converters in validator converter store to be used on converting configurations
  if (additionalValidatorConverters) {
    useValidatorConverterStore.getState().set(additionalValidatorConverters);
  }

  return body;
};
