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

import {
  PagingParameter, PagingResponse, RegistryGroupConfiguration, SearchParameter, SortProperty, SortResponse,
} from "../api";

/**
 * Request when fetching a list of registry entries.
 */
export type RegistryRequest = {
  /**
   * Full Java class name of the registry entity
   */
  classFullName: string;

  /**
   * List of sort rules for this search request
   */
  sortPropertyList?: SortProperty[];

  /**
   * Search configuration for this request
   */
  searchParameter?: SearchParameter;

} & PagingParameter;

/**
 * Response of a single registry entity request.
 */
export type RegistryResponse<T> = {
  /**
   * List of result entities.
   */
  content: T[];

  /**
   * Result sort.
   */
  sort: SortResponse;
} & PagingResponse;

/**
 * Fetches whole registry configuration.
 */
export const loadRegistryConfiguration = async (): Promise<RegistryGroupConfiguration[]> => {
  const response = await fetch("/nrich/registry/configuration/fetch", {
    method: "POST",
  });
  const data = await response.json() as RegistryGroupConfiguration[];
  return data;
};

/**
 * Fetches single registry entity list with given paging and sorting parameters.
 * @param request Single load request which contains entity class, paging, sorting and search options
 * @returns List of entity results
 */
export const loadEntities = async (request: RegistryRequest): Promise<RegistryResponse<any>> => {
  const response = await fetch("/nrich/registry/data/list", {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json() as RegistryResponse<any>;
  return data;
};

/**
 * Fetches multiple registry entity lists for given registry requests.
 * @param requests List of registry requests
 * @returns Map of results where key is full class name and value is single entity response list
 */
export const bulkLoadEntities = async (requests: RegistryRequest[]): Promise<Record<string, RegistryResponse<any>>> => {
  const response = await fetch("/nrich/registry/data/list-bulk", {
    method: "POST",
    body: JSON.stringify({
      registryRequestList: requests,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json() as Record<string, RegistryResponse<any>>;
  return data;
};

/**
 * Creates new entry for given registry entity
 * @param classFullName Full Java class name of the registry entity
 * @param createData Object with data of new entity
 * @returns Created entity
 */
export const createEntity = async (classFullName: string, createData: any): Promise<any> => {
  const response = await fetch("/nrich/registry/data/create", {
    method: "POST",
    body: JSON.stringify({
      classFullName,
      jsonEntityData: JSON.stringify(createData),
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

/**
 * Updates existing entity with new data
 * @param classFullName Full Java class name of the registry entity
 * @param id Id of the existing entity
 * @param updateData Object with update date for existing entity
 * @returns Updated entity
 */
export const updateEntity = async (classFullName: string, id: any, updateData: any): Promise<any> => {
  const response = await fetch("/nrich/registry/data/update", {
    method: "POST",
    body: JSON.stringify({
      classFullName,
      id,
      jsonEntityData: JSON.stringify(updateData),
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data;
};

/**
 * Deletes existing entity
 * @param classFullName Full Java class name of the registry entity
 * @param id Id of the existing entity
 */
export const removeEntity = async (classFullName: string, id: any): Promise<void> => {
  await fetch("/nrich/registry/data/delete", {
    method: "POST",
    body: JSON.stringify({ classFullName, id }),
    headers: { "Content-Type": "application/json" },
  });
};
