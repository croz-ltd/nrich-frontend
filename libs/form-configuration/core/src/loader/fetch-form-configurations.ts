import { FormConfiguration, FormConfigurationConfiguration, FormYupConfiguration } from "../api";
import { FormConfigurationValidationConverter } from "../converter/FormConfigurationValidationConverter";
import { useFormConfigurationStore } from "../store/form-configuration-store";

export const fetchFormConfigurations = async ({ url, requestOptionsResolver, additionalValidatorConverters }: FormConfigurationConfiguration): Promise<FormConfiguration[]> => {
  const formConfigurationValidationConverter = new FormConfigurationValidationConverter(additionalValidatorConverters);
  const additionalOptions = requestOptionsResolver?.() || {};

  const response = await fetch(`${url}/fetch-all`, {
    method: "POST",
    ...additionalOptions,
  });
  const body = await response.json() as FormConfiguration[];

  const formYupConfigurations: FormYupConfiguration[] = [];

  // set the response to the form configuration store
  if (response.ok) {
    body.forEach((item) => {
      formYupConfigurations.push({
        formId: item.formId,
        yupSchema: formConfigurationValidationConverter.convertFormConfigurationToYupSchema(item.constrainedPropertyConfigurationList),
        constrainedPropertyConfigurationList: item.constrainedPropertyConfigurationList,
      });
    });
    useFormConfigurationStore.getState().set(formYupConfigurations);
    useFormConfigurationStore.getState().setFormConfigurationLoaded(true);
  }

  return body;
};
