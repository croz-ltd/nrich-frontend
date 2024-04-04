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

import create from "zustand";

import { RegistryConfiguration, RegistryGroupConfiguration } from "../api";

export interface RegistryConfigurationStore {

  /**
   * Array of group configurations.
   */
  groupConfigurations: RegistryGroupConfiguration[];

  /**
   * Load configuration
   */
  load: (groupConfigurations) => void;

  /**
   * Entity formatters used for rendering complex entity types
   */
  entityFormatters: Record<string, (value: any) => string>;

  /**
   * Entity formatters setter
   */
  setEntityFormatters: (entityFormatters: Record<string, (value: any) => string>) => void;

  /**
   * Registry configuration
   */
  registryConfiguration: RegistryConfiguration;

  /**
   * Registry configuration setter
   */
  setRegistryConfiguration: (registryConfiguration: RegistryConfiguration) => void;
}

export const useRegistryConfigurationStore = create<RegistryConfigurationStore>((set) => ({
  groupConfigurations: [],
  load: (groupConfigurations) => set(() => ({
    groupConfigurations,
  })),
  entityFormatters: {},
  setEntityFormatters: (entityFormatters) => set(() => ({
    entityFormatters,
  })),
  registryConfiguration: {},
  setRegistryConfiguration: (registryConfiguration) => set(() => ({
    registryConfiguration,
  })),
}));
