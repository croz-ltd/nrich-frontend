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
  bulkLoadEntities, createEntity, loadEntities, loadRegistryConfiguration, RegistryRequest, removeEntity, updateEntity,
} from "../../src/service";
import { registryConfigurationMock } from "../testutil/registry-mock";
import { setupRegistryServer } from "../testutil/setup-registry-server";

const server = setupRegistryServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-registry-core/service", () => {
  it("should fetch registry configuration from backend", async () => {
    // when
    const configuration = await loadRegistryConfiguration();

    // then
    expect(configuration.length).toEqual(registryConfigurationMock.length);
    expect(configuration[0].groupId).toEqual(registryConfigurationMock[0].groupId);
    expect(configuration[0].entityConfigurationList.length).toEqual(registryConfigurationMock[0].entityConfigurationList.length);
    expect(configuration[1].groupId).toEqual(registryConfigurationMock[1].groupId);
    expect(configuration[1].entityConfigurationList.length).toEqual(registryConfigurationMock[1].entityConfigurationList.length);
  });

  it("should fetch entities for given registry request", async () => {
    // given
    const request: RegistryRequest = {
      classFullName: "net.croz.nrichdemobackend.registry.model.Address",
      pageNumber: 0,
      pageSize: 3,
    };

    // when
    const result = await loadEntities(request);

    // then
    expect(result.content.length).toEqual(request.pageSize);
    expect(result.first).toEqual(true);
    expect(result.last).toEqual(false);
  });

  it("should bulk fetch entites for given registry requests", async () => {
    // given
    const addressRequest: RegistryRequest = {
      classFullName: "net.croz.nrichdemobackend.registry.model.Address",
      pageNumber: 0,
      pageSize: 3,
    };

    const countryRequest: RegistryRequest = {
      classFullName: "net.croz.nrichdemobackend.registry.model.Country",
      pageNumber: 0,
      pageSize: 5,
    };

    const requests = [addressRequest, countryRequest];

    // when
    const result = await bulkLoadEntities(requests);

    // then
    expect(Object.keys(result).length).toEqual(requests.length);
    expect(result[addressRequest.classFullName]).toBeDefined();
    expect(result[countryRequest.classFullName]).toBeDefined();
    expect(result[addressRequest.classFullName].content.length).toEqual(addressRequest.pageSize);
    expect(result[countryRequest.classFullName].content.length).toEqual(countryRequest.pageSize);
  });

  it("should successfully create new entity for given request", async () => {
    // given
    const addressCreateRequest = {
      street: "Street: 0",
      streetNumber: 1,
      city: "City: 0",
      country: {
        id: 1,
      },
    };

    // when
    const result = await createEntity("net.croz.nrichdemobackend.registry.model.Address", addressCreateRequest);

    // then
    expect(result).toBeDefined();
    expect(result.street).toEqual(addressCreateRequest.street);
    expect(result.streetNumber).toEqual(addressCreateRequest.streetNumber);
    expect(result.city).toEqual(addressCreateRequest.city);
    expect(result.country.id).toEqual(addressCreateRequest.country.id);
  });

  it("should successfully update existing entity for given request", async () => {
    // given
    const addressUpdateRequest = {
      street: "Street: 3",
      streetNumber: 4,
      city: "City: 2",
      country: {
        id: 1,
      },
    };

    // when
    const result = await updateEntity("net.croz.nrichdemobackend.registry.model.Address", 16, addressUpdateRequest);

    // then
    expect(result).toBeDefined();
    expect(result.street).toEqual(addressUpdateRequest.street);
    expect(result.streetNumber).toEqual(addressUpdateRequest.streetNumber);
    expect(result.city).toEqual(addressUpdateRequest.city);
    expect(result.country.id).toEqual(addressUpdateRequest.country.id);
  });

  it("should successfully update existing entity for given request", async () => {
    await removeEntity("net.croz.nrichdemobackend.registry.model.Address", 16);
  });
});
