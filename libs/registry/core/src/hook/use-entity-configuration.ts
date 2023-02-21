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

import { useRegistryConfigurationStore } from "../store";

/**
 * Fetches {@link #RegistryEntityConfiguration} for given entity
 * @param name short name of entity or its full class name
 */
export const useEntityConfiguration = (name: string) => {
  const entityConfiguration = useRegistryConfigurationStore((state) => state.groupConfigurations
    .flatMap((groupConfiguration) => groupConfiguration.entityConfigurationList)
    .find((configuration) => configuration.name === name || configuration.classFullName === name));
  if (entityConfiguration === undefined) {
    return undefined;
  }

  const entityIdProperty = entityConfiguration.propertyConfigurationList.find((property) => property.id);

  return { entityConfiguration, entityIdProperty };
};
