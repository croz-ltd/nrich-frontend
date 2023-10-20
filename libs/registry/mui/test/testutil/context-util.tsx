import React from "react";

import { FormConfigurationProvider } from "@croz/nrich-form-configuration-core";
import { RegistryEntityConfiguration, RegistryEntityContextProvider } from "@croz/nrich-registry-core";

export const createEntityContextWrapper = (entityConfiguration: RegistryEntityConfiguration) => ({ children }: { children: React.ReactNode }) => (
  <RegistryEntityContextProvider entityConfiguration={entityConfiguration}>
    {children}
  </RegistryEntityContextProvider>
);

export const createFormAndEntityWrapper = (entityConfiguration: RegistryEntityConfiguration) => ({ children }: { children: React.ReactNode }) => (
  <FormConfigurationProvider>
    {createEntityContextWrapper(entityConfiguration)({ children })}
  </FormConfigurationProvider>
);
