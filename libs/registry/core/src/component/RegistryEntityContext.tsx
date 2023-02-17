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

import { RegistryEntityConfiguration, RegistryPropertyConfiguration } from "../api";
import { useRegistryConfigurationStore } from "../store";

/**
 * Type for {@link #RegistryEntityContext} value
 */
interface RegistryEntityContextType {
  /**
   * Configuration of administered registry entity
   */
  entityConfiguration: RegistryEntityConfiguration;

  /**
   * Final list of properties to be shown on table or in form. For simple registry, contains only propertyConfigurationList.
   * For entities with complex ids it contains all fields from id object mapped for easier usage and UX
   */
  finalProperties: RegistryPropertyConfiguration[];

  /**
   * Map containing entity configurations for all sub-entities of this entity.
   * Key is full class name, and value is configuration
   */
  singularAssociationsMap: Record<string, RegistryEntityConfiguration>;
}

/**
 * Helper context used for easier data sharing in registry entity administration components
 */
export const RegistryEntityContext = React.createContext<RegistryEntityContextType | undefined>(undefined);

/**
 * {@link #RegistryEntityContextProvider} props
 */
interface Props {
  /**
   * Configuration of the administered entity
   */
  entityConfiguration: RegistryEntityConfiguration;

  /**
   * Children where this context is provided
   */
  children: React.ReactElement | React.ReactElement[];
}

/**
 * Helper provider for {@link #RegistryEntityContext} used for easier data sharing in registry entity administration components
 * @param entityConfiguration configuration of the administered entity
 * @param children children where this context is provided
 */
export const RegistryEntityContextProvider = ({ entityConfiguration, children }: Props) => {
  const entityConfigurations = useRegistryConfigurationStore((state) => state.groupConfigurations
    .flatMap((groupConfiguration) => groupConfiguration.entityConfigurationList));

  const singularAssociationsMap = React.useMemo(() => {
    const singularAssociations = [...entityConfiguration.propertyConfigurationList, ...entityConfiguration.embeddedIdPropertyConfigurationList]
      .filter((property) => property.singularAssociation)
      .map((property) => property.singularAssociationReferencedClass);

    return singularAssociations.reduce(
      (all, current) => ({ ...all, [current]: entityConfigurations.find((configuration) => configuration.classFullName === current) }),
      {},
    );
  }, [entityConfiguration]);

  const finalProperties = React.useMemo(() => {
    if (entityConfiguration.embeddedIdentity) {
      return entityConfiguration.propertyConfigurationList.flatMap((property) => {
        if (property.id) {
          return entityConfiguration.embeddedIdPropertyConfigurationList;
        }
        return property;
      });
    }
    return entityConfiguration.propertyConfigurationList;
  }, [entityConfiguration]);

  const value = React.useMemo(() => ({
    entityConfiguration,
    finalProperties,
    singularAssociationsMap,
  }), [entityConfiguration]);

  return (
    <RegistryEntityContext.Provider value={value}>
      {children}
    </RegistryEntityContext.Provider>
  );
};
