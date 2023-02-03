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

import { RegistryEntityConfiguration } from "../api";
import {
  createEntity, loadEntities, RegistryRequest, RegistryResponse, removeEntity, updateEntity,
} from "../service";
import { useRegistryConfigurationStore } from "../store";

const INITIAL_PAGE_SIZE = 25;

export type EntityRegistryRequest = Omit<RegistryRequest, "classFullName">;

export interface UseRegistryEntity {
  entityConfiguration: RegistryEntityConfiguration;
  data: RegistryResponse<any[]>;

  load: (request: EntityRegistryRequest) => Promise<void>;

  add: (createData: any) => Promise<any>;

  edit: (id: any, updateData: any) => Promise<any>;

  remove: (id: any) => Promise<void>;
}

export const DEFAULT_INITIAL_REQUEST: EntityRegistryRequest = {
  pageNumber: 0,
  pageSize: INITIAL_PAGE_SIZE,
};

export const useRegistryEntity = (name: string, initialRequest: EntityRegistryRequest = DEFAULT_INITIAL_REQUEST): UseRegistryEntity => {
  const entityConfiguration = useRegistryConfigurationStore((state) => state.groupConfigurations
    .flatMap((groupConfiguration) => groupConfiguration.entityConfigurationList)
    .find((configuration) => configuration.name === name));

  const [data, setData] = React.useState<RegistryResponse<any[]>>({
    content: [],
    empty: true,
    first: true,
    last: true,
    sort: {
      sorted: false,
      unsorted: true,
    },
    numberOfElements: 0,
    totalElements: 0,
    totalPages: 0,
  });

  const load = async (request: EntityRegistryRequest) => {
    const loadedData = await loadEntities({ classFullName: entityConfiguration.classFullName, ...request });
    setData(loadedData);
  };

  React.useEffect(() => {
    load(initialRequest);
  }, []);

  const add = async (createData: any) => {
    await createEntity(entityConfiguration.classFullName, createData);
    await load(initialRequest);
  };

  const edit = async (id: any, updateData: any) => {
    await updateEntity(entityConfiguration.classFullName, id, updateData);
    await load(initialRequest);
  };

  const remove = async (id: any) => {
    await removeEntity(entityConfiguration.classFullName, id);
    await load(initialRequest);
  };

  return {
    entityConfiguration,
    data,
    load,
    add,
    edit,
    remove,
  };
};
