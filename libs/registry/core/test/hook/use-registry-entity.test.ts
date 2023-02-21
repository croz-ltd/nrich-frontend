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

import { act, renderHook } from "@testing-library/react";

import {
  DEFAULT_INITIAL_REQUEST, EntityRegistryRequest, useRegistryConfigurationStore, useRegistryEntity,
} from "../../src";
import * as service from "../../src/service/service";
import { registryConfigurationMock } from "../testutil/registry-mock";
import { setupRegistryServer } from "../testutil/setup-registry-server";
import { sleep } from "../testutil/sleep";

const server = setupRegistryServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-registry-core/use-registry-entity", () => {
  const entityName = "Address";

  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should contain all default data", async () => {
    // given
    const spyLoadEntities = jest.spyOn(service, "loadEntities");

    // when
    const { result } = renderHook(() => useRegistryEntity(entityName));
    const { entityConfiguration, data } = result.current;

    // then
    expect(entityConfiguration.name).toEqual(entityName);
    expect(entityConfiguration.propertyConfigurationList.length).toBeGreaterThan(0);
    expect(data.content.length).toEqual(0);
    expect(data.empty).toEqual(true);

    // and then
    await act(() => sleep(50));
    expect(spyLoadEntities).toHaveBeenCalledWith({ classFullName: entityConfiguration.classFullName, ...DEFAULT_INITIAL_REQUEST });
    expect(spyLoadEntities).toHaveBeenCalledTimes(1);
    expect(result.current.data.content.length).toBeGreaterThan(0);
  });

  it("should make initial fetch with custom request", async () => {
    // given
    const spyLoadEntities = jest.spyOn(service, "loadEntities");
    const initialRequest: EntityRegistryRequest = {
      pageNumber: 0,
      pageSize: 25,
      sortPropertyList: [
        {
          property: "id",
          direction: "ASC",
        },
      ],
    };
    const { result } = renderHook(() => useRegistryEntity(entityName, initialRequest));
    const { entityConfiguration } = result.current;

    // then
    await act(() => sleep(50));
    expect(spyLoadEntities).toHaveBeenCalledWith({ classFullName: entityConfiguration.classFullName, ...initialRequest });
    expect(result.current.data.content.length).toBeGreaterThan(0);
  });

  it("should reload data when called explicitly", async () => {
    // given
    const spyLoadEntities = jest.spyOn(service, "loadEntities");
    const additionalRequest: EntityRegistryRequest = { ...DEFAULT_INITIAL_REQUEST, pageNumber: 1 };

    // when
    const { result } = renderHook(() => useRegistryEntity(entityName));
    const { entityConfiguration } = result.current;

    await act(() => sleep(50));
    spyLoadEntities.mockReset();

    await act(() => result.current.load(additionalRequest));

    // then
    expect(spyLoadEntities).toHaveBeenCalledTimes(1);
    expect(spyLoadEntities).toHaveBeenCalledWith({ classFullName: entityConfiguration.classFullName, ...additionalRequest });
  });

  it("should call appropriate calls when adding data", async () => {
    // given
    const addressCreateRequest = {
      street: "Street: 0",
      streetNumber: 1,
      city: "City: 0",
      country: {
        id: 1,
      },
    };
    const spyLoadEntities = jest.spyOn(service, "loadEntities");
    const spyCreateEntity = jest.spyOn(service, "createEntity");

    // when
    const { result } = renderHook(() => useRegistryEntity(entityName));
    const { entityConfiguration } = result.current;

    // then
    await act(() => result.current.add(addressCreateRequest));
    expect(spyCreateEntity).toHaveBeenCalledWith(entityConfiguration.classFullName, addressCreateRequest);
    expect(spyLoadEntities).toHaveBeenCalledTimes(2);
  });

  it("should call appropriate calls when editing data", async () => {
    // given
    const addressUpdateRequest = {
      street: "Street: 3",
      streetNumber: 4,
      city: "City: 2",
      country: {
        id: 1,
      },
    };
    const id = 16;
    const spyLoadEntities = jest.spyOn(service, "loadEntities");
    const spyUpdateEntity = jest.spyOn(service, "updateEntity");

    // when
    const { result } = renderHook(() => useRegistryEntity(entityName));
    const { entityConfiguration } = result.current;

    // then
    await act(() => result.current.edit(id, addressUpdateRequest));
    expect(spyUpdateEntity).toHaveBeenCalledWith(entityConfiguration.classFullName, id, addressUpdateRequest);
    expect(spyLoadEntities).toHaveBeenCalledTimes(2);
  });

  it("should call appropriate calls when removing data", async () => {
    // given
    const id = 16;
    const spyLoadEntities = jest.spyOn(service, "loadEntities");
    const spyRemoveEntity = jest.spyOn(service, "removeEntity");

    // when
    const { result } = renderHook(() => useRegistryEntity(entityName));
    const { entityConfiguration } = result.current;

    // then
    await act(() => result.current.remove(id));
    expect(spyRemoveEntity).toHaveBeenCalledWith(entityConfiguration.classFullName, id);
    expect(spyLoadEntities).toHaveBeenCalledTimes(2);
  });
});
