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

import { useRegistryConfigurationStore, useRegistryForm } from "../../src";
import { createFormAndEntityWrapper } from "../testutil/context-util";
import { registryConfigurationMock } from "../testutil/registry-mock";
import { setupFormConfigurationServer } from "../testutil/setup-form-configuration-server";
import { sleep } from "../testutil/sleep";

const server = setupFormConfigurationServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe("@croz/nrich-registry-core/use-registry-form", () => {
  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return correct values for create form", async () => {
    // given
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const wrapper = createFormAndEntityWrapper(configuration);

    // when
    const { result } = renderHook(() => useRegistryForm(undefined, "create"), { wrapper });
    await act(() => sleep(50)); // wait for registry provider to fetch config

    // then
    const {
      finalInitialValues, yupSchema, entityConfiguration, properties,
    } = result.current;
    expect(finalInitialValues).toEqual({
      city: null,
      country: null,
      createdDate: null,
      id: null,
      lastModifiedDate: null,
      street: null,
      streetNumber: null,
    });
    expect(yupSchema).toBeDefined();
    expect(entityConfiguration).toEqual(configuration);
    expect(properties).toHaveLength(6);
  });

  it("should return correct values for simple update form", async () => {
    // given
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const wrapper = createFormAndEntityWrapper(configuration);
    const initialValues = {
      city: "City: 0",
      country: { id: 2 },
      createdDate: "2023-02-20",
      id: 1,
      lastModifiedDate: "2023-02-20",
      street: "Street: 1",
      streetNumber: 24,
    };

    // when
    const { result } = renderHook(() => useRegistryForm(initialValues, "update"), { wrapper });
    await act(() => sleep(50)); // wait for registry provider to fetch config

    // then
    const {
      finalInitialValues, yupSchema, entityConfiguration, properties,
    } = result.current;
    expect(finalInitialValues).toEqual(initialValues);
    expect(yupSchema).toBeDefined();
    expect(entityConfiguration).toEqual(configuration);
    expect(properties).toHaveLength(7);
  });

  it("should return correct values for complex update form", async () => {
    // given
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Book").entityConfigurationList
      .find((entity) => entity.name === "AuthorBook");
    const wrapper = createFormAndEntityWrapper(configuration);
    const initialValues = {
      id: {
        author: { id: 1 },
        book: { id: 2 },
      },
      createdDate: "2023-02-20",
      edition: "Edition: 1",
      editionNumber: 1,
      lastModifiedDate: "2023-02-20",
    };

    // when
    const { result } = renderHook(() => useRegistryForm(initialValues, "update"), { wrapper });
    await act(() => sleep(50)); // wait for registry provider to fetch config

    // then
    const {
      finalInitialValues, yupSchema, entityConfiguration, properties,
    } = result.current;
    expect(finalInitialValues).toEqual({
      "id.author": { id: 1 },
      "id.book": { id: 2 },
      createdDate: "2023-02-20",
      edition: "Edition: 1",
      editionNumber: 1,
      lastModifiedDate: "2023-02-20",
    });
    expect(yupSchema).toBeDefined();
    expect(entityConfiguration).toEqual(configuration);
    expect(properties).toHaveLength(6);
  });
});
