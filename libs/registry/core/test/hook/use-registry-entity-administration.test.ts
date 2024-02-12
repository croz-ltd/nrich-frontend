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

import { DEFAULT_INITIAL_REQUEST, useRegistryConfigurationStore, useRegistryEntityAdministration } from "../../src";
import { registryConfigurationMock, registryListMock } from "../testutil/registry-mock";
import { setupRegistryServer } from "../testutil/setup-registry-server";

const server = setupRegistryServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-registry-core/use-registry-entity-administration", () => {
  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const entityName = "Address";
  it("should return correct values", () => {
    // when
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));

    // then
    const {
      entityConfiguration, entityIdProperty, data, formData, formModalOpen, closeFormModal, loading, formType, handleEditClick,
      handleSubmitClick, handleAddClick, handleAddFromCopyClick, handleFilterUpdate, handlePreviewClick, handlePagingUpdate, request, remove,
    } = result.current;

    // configuration
    expect(entityConfiguration.name).toEqual(entityName);
    expect(entityIdProperty).toBeDefined();

    // data
    expect(data.content).toEqual([]);
    expect(loading).toEqual(false);

    // filter
    expect(request).toEqual(DEFAULT_INITIAL_REQUEST);
    expect(handleFilterUpdate).toBeDefined();
    expect(handlePagingUpdate).toBeDefined();

    // actions
    expect(handleEditClick).toBeDefined();
    expect(handleAddClick).toBeDefined();
    expect(handleAddFromCopyClick).toBeDefined();
    expect(handlePreviewClick).toBeDefined();
    expect(handleSubmitClick).toBeDefined();
    expect(remove).toBeDefined();

    // form
    expect(formType).toEqual(undefined);
    expect(formData).toEqual(undefined);
    expect(formModalOpen).toEqual(false);
    expect(closeFormModal).toBeDefined();
  });

  it("should correctly manage filter updates", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleFilterUpdate, handlePagingUpdate,
    } = result.current;

    // when
    await act(() => handlePagingUpdate({ pageNumber: 1, pageSize: 10 }));

    // then
    expect(result.current.request.pageSize).toEqual(10);
    expect(result.current.request.pageNumber).toEqual(1);

    // and when
    await act(() => handleFilterUpdate({ query: "test", propertyNameList: ["city"] }));

    // then
    expect(result.current.request.searchParameter).toEqual({ query: "test", propertyNameList: ["city"] });
  });

  it("should correctly manage add actions", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleAddClick, closeFormModal,
    } = result.current;

    // when
    await act(() => handleAddClick());

    // then
    expect(result.current.formType).toEqual("create");
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(true);

    // and when
    await act(() => closeFormModal());

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage add from copy actions", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleAddFromCopyClick, closeFormModal,
    } = result.current;
    const rowData = registryListMock.content[0];

    // when
    await act(() => handleAddFromCopyClick(rowData));

    // then
    expect(result.current.formType).toEqual("create");
    expect(result.current.formData).toEqual(rowData);
    expect(result.current.formModalOpen).toEqual(true);

    // and when
    await act(() => closeFormModal());

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage edit actions", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleEditClick, closeFormModal,
    } = result.current;
    const rowData = registryListMock.content[0];

    // when
    await act(() => handleEditClick(rowData.id, rowData));

    // then
    expect(result.current.formType).toEqual("update");
    expect(result.current.formData).toEqual(rowData);
    expect(result.current.formModalOpen).toEqual(true);

    // and when
    await act(() => closeFormModal());

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage preview actions", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handlePreviewClick, closeFormModal,
    } = result.current;
    const rowData = registryListMock.content[0];

    // when
    await act(() => handlePreviewClick(rowData));

    // then
    expect(result.current.formType).toEqual("preview");
    expect(result.current.formData).toEqual(rowData);
    expect(result.current.formModalOpen).toEqual(true);

    // and when
    await act(() => closeFormModal());

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage submit after adding", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleAddClick, handleSubmitClick,
    } = result.current;

    // when
    await act(() => handleAddClick());
    await act(() => handleSubmitClick({
      street: "Street: 2",
      streetNumber: 3,
      city: "City: 1",
      country: {
        id: 1,
      },
    }));

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage submit after adding from copy", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleAddFromCopyClick, handleSubmitClick,
    } = result.current;
    const rowData = registryListMock.content[0];

    // when
    await act(() => handleAddFromCopyClick(rowData));
    await act(() => handleSubmitClick({
      street: "Street: 2",
      streetNumber: 3,
      city: "City: 1",
      country: {
        id: 1,
      },
    }));

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });

  it("should correctly manage submit after editing", async () => {
    // given
    const { result } = renderHook(() => useRegistryEntityAdministration(entityName));
    const {
      handleEditClick, handleSubmitClick,
    } = result.current;
    const rowData = registryListMock.content[0];

    // when
    await act(() => handleEditClick(rowData.id, rowData));
    await act(() => handleSubmitClick({
      street: "Street: 2",
      streetNumber: 3,
      city: "City: 1",
      country: {
        id: 1,
      },
    }));

    // then
    expect(result.current.formType).toEqual(undefined);
    expect(result.current.formData).toEqual(undefined);
    expect(result.current.formModalOpen).toEqual(false);
  });
});
