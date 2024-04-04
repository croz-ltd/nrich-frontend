/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import React from "react";

import { loadRegistryConfiguration } from "../service";
import { RegistryConfigurationStore, useRegistryConfigurationStore } from "../store";

/**
 * {@link RegistryProvider} properties
 */
interface Props extends Partial<RegistryConfigurationStore> {
  /**
   * Children where registry configuration is provided
   */
  children: React.ReactNode;
}

/**
 * Provider for registry configuration. Until registry is fetched, renders loading screen.
 * @param children Children where registry configuration is provided
 * @param registryConfiguration Registry configuration for baseURL and requestOptionsResolver
 * @param entityFormatters Formatters for complex object types
 */
export const RegistryProvider = ({ children, registryConfiguration = {}, entityFormatters = {} }: Props) => {
  const { load, setRegistryConfiguration, setEntityFormatters } = useRegistryConfigurationStore();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const loadConfiguration = async () => {
      setRegistryConfiguration({ ...registryConfiguration });
      setEntityFormatters(entityFormatters);

      const configuration = await loadRegistryConfiguration();
      load(configuration);
      setLoading(false);
    };
    loadConfiguration();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
