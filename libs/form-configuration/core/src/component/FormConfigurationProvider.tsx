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

import React, { useEffect } from "react";

import { FormConfigurationConfiguration } from "../api";
import { useFormConfiguration } from "../hook";
import { fetchFormConfigurations } from "../loader";

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
export const FormConfigurationProvider = ({ children, loader, ...fetchProps }: Props) => {
  useEffect(() => {
    fetchFormConfigurations({ ...fetchProps });
  }, []);

  const { formConfigurationLoaded } = useFormConfiguration();

  return <div>{formConfigurationLoaded ? children : loader ?? null}</div>;
};
