import React from "react";

import { useFormConfiguration } from "../hook";

export interface Props {

  /**
   * Content to show conditionally
   */
  children: React.ReactNode;

  /**
   * Custom loader to show until content loads
   */
  loader?: React.ReactNode;
}

/**
 * Should be used to wrap the whole app that includes forms, so it doesn't render them without loading form configuration from API first.
 * @param children content to show conditionally
 * @param loader custom loader to show until content loads
 */
const FormConfigurationWrapper = ({ children, loader }: Props) => {
  const { formConfigurationLoaded } = useFormConfiguration();

  return <div>{formConfigurationLoaded ? children : loader ?? null}</div>;
};

export default FormConfigurationWrapper;
