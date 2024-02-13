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
import {
  createEntity, loadEntities, RegistryRequest, RegistryResponse, removeEntity, updateEntity,
} from "../service";
import { useEntityConfiguration } from "./use-entity-configuration";

const INITIAL_PAGE_SIZE = 25;

/**
 * Request when fetching a list of registry entries, without class specifics
 */
export type EntityRegistryRequest = Omit<RegistryRequest, "classFullName">;

/**
 * Return type of {@link useRegistryEntity}. Contains main data and methods for managing registry entities.
 */
export interface UseRegistryEntity {
  /**
   * Configuration of wanted entity
   */
  entityConfiguration: RegistryEntityConfiguration;

  /**
   * Id property of the entity
   */
  entityIdProperty: RegistryPropertyConfiguration;

  /**
   * Currently fetched data for this entity.
   */
  data: RegistryResponse<any[]>;

  /**
   * Method for reloading data explicitly with given request.
   * @param request search, filter and paging data of this request
   */
  load: (request: EntityRegistryRequest) => Promise<void>;

  /**
   * Adds new entity. Should conform to structure from {@link entityConfiguration}.
   * Automatically re-fetches with request provided to hook.
   * @param createData data for new entity
   */
  add: (createData: any) => Promise<any>;

  /**
   * Edits existing entity. Should conform to structure from {@link entityConfiguration}.
   * Automatically re-fetches with request provided to hook.
   * @param id id of the data for editing. When complex ids are used, it should be an object containing all id fields.
   * @param updateData data for editable entity
   */
  edit: (id: any, updateData: any) => Promise<any>;

  /**
   * Deletes existing entity.
   * Automatically re-fetches with request provided to hook.
   * @param id id of the data for editing. When complex ids are used, it should be an object containing all id fields.
   */
  remove: (id: any) => Promise<any>;
}

/**
 * Default request for fetching used when other is not provided. Starts on first page with size of 25.
 */
export const DEFAULT_INITIAL_REQUEST: EntityRegistryRequest = {
  pageNumber: 0,
  pageSize: INITIAL_PAGE_SIZE,
};

export const useRegistryEntity = (name: string, initialRequest: EntityRegistryRequest = DEFAULT_INITIAL_REQUEST): UseRegistryEntity => {
  const { entityConfiguration, entityIdProperty } = useEntityConfiguration(name);

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
    const response = await createEntity(entityConfiguration.classFullName, createData);
    await load(initialRequest);

    return response;
  };

  const edit = async (id: any, updateData: any) => {
    const response = await updateEntity(entityConfiguration.classFullName, id, updateData);
    await load(initialRequest);

    return response;
  };

  const remove = async (id: any) => {
    const response = await removeEntity(entityConfiguration.classFullName, id);
    await load(initialRequest);

    return response;
  };

  return {
    entityConfiguration,
    entityIdProperty,
    data,
    load,
    add,
    edit,
    remove,
  };
};
