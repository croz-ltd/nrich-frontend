import React from "react";

import { FormConfigurationProvider } from "@nrich/form-configuration-core";

import { FormConfigurationInner } from "../components/FormConfigurationInner";

const FormConfiguration = () => (
  <FormConfigurationProvider loader="Loading..." url="/nrich/form/configuration">
    <FormConfigurationInner />
  </FormConfigurationProvider>
);

export default FormConfiguration;
