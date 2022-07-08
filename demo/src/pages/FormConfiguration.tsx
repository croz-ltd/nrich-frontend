import React, { useEffect } from "react";

import { fetchFormConfigurations, FormConfigurationWrapper } from "@nrich/form-configuration-core";

import { FormConfigurationInner } from "../components/FormConfigurationInner";

const FormConfiguration = () => {
  useEffect(() => {
    fetchFormConfigurations({ url: "/nrich/form/configuration" });
  }, []);

  return (
    <FormConfigurationWrapper loader="Loading...">
      <FormConfigurationInner />
    </FormConfigurationWrapper>

  );
};

export default FormConfiguration;
