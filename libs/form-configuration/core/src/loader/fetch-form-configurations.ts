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

import { FormConfiguration, FormConfigurationConfiguration, FormYupConfiguration } from "../api";
import { FormConfigurationValidationConverter } from "../converter/FormConfigurationValidationConverter";
import { useFormConfigurationStore } from "../store/form-configuration-store";

export const fetchFormConfigurations = async ({ url, requestOptionsResolver, additionalValidatorConverters }: FormConfigurationConfiguration): Promise<FormConfiguration[]> => {
  const formConfigurationValidationConverter = new FormConfigurationValidationConverter(additionalValidatorConverters);
  const additionalOptions = requestOptionsResolver?.() || {};
  const finalUrl = url || "/nrich/form/configuration";

  const response = await fetch(`${finalUrl}/fetch-all`, {
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
      });
    });
    useFormConfigurationStore.getState().set(formYupConfigurations);
    useFormConfigurationStore.getState().setFormConfigurationLoaded(true);
  }

  return body;
};
