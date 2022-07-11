import React, { useEffect } from "react";

import { FormConfigurationConfiguration } from "../api";
import { useFormConfiguration } from "../hook";
import { fetchFormConfigurations } from "../loader/fetch-form-configurations";

export type Props = {

  /**
   * Content to show conditionally
   */
  children: React.ReactNode;

  /**
   * Custom loader to show until content loads
   */
  loader?: React.ReactNode;
} & FormConfigurationConfiguration;

/**
 * Should be used to wrap the whole app that includes forms, so it doesn't render them without loading form configuration from API first.
 * @param children content to show conditionally
 * @param loader custom loader to show until content loads
 */
const FormConfigurationProvider = ({ children, loader, ...fetchProps }: Props) => {
  useEffect(() => {
    fetchFormConfigurations({ ...fetchProps });
  }, []);

  const { formConfigurationLoaded } = useFormConfiguration();

  return <div>{formConfigurationLoaded ? children : loader ?? null}</div>;
};

export default FormConfigurationProvider;
