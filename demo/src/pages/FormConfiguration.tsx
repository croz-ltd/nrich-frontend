import React from "react";

import { FormConfigurationWrapper } from "@nrich/form-configuration-core";

import { FormConfigurationInner } from "../components/FormConfigurationInner";

const FormConfiguration = () => (
  <FormConfigurationWrapper loader="Loading..." url="/nrich/form/configuration">
    <FormConfigurationInner />
  </FormConfigurationWrapper>
);

export default FormConfiguration;
