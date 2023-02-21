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
import { ChangeEvent } from "react";

import { useRegistryConfigurationStore, useRegistryFilter } from "../../src";
import { createEntityContextWrapper } from "../testutil/context-util";
import { registryConfigurationMock } from "../testutil/registry-mock";

describe("@croz/nrich-registry-core/use-registry-filter", () => {
  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return correct data for simple entity", () => {
    // given
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const wrapper = createEntityContextWrapper(configuration);

    // when
    const { result } = renderHook(useRegistryFilter, { wrapper });

    // then
    const {
      availableFields, searchParameter, handleFieldsChange, handleQueryChange,
    } = result.current;
    expect(availableFields.length).toEqual(7);
    expect(searchParameter).toEqual({ query: "", propertyNameList: [] });
    expect(handleFieldsChange).toBeDefined();
    expect(handleQueryChange).toBeDefined();
  });

  it("should return correct data for complex entity", () => {
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Book").entityConfigurationList
      .find((entity) => entity.name === "AuthorBook");
    const wrapper = createEntityContextWrapper(configuration);

    // when
    const { result } = renderHook(useRegistryFilter, { wrapper });

    // then
    const {
      availableFields, searchParameter, handleFieldsChange, handleQueryChange,
    } = result.current;
    expect(availableFields.length).toEqual(6);
    expect(searchParameter).toEqual({ query: "", propertyNameList: [] });
    expect(handleFieldsChange).toBeDefined();
    expect(handleQueryChange).toBeDefined();
  });

  it("should update search parameter correctly after query change", () => {
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const wrapper = createEntityContextWrapper(configuration);

    // when
    const { result } = renderHook(useRegistryFilter, { wrapper });

    // then
    act(() => {
      result.current.handleQueryChange({ target: { value: "test" } } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.searchParameter).toEqual({ query: "test", propertyNameList: [] });
  });

  it("should update search parameter correctly after fields change with comma change event", () => {
    const configuration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const wrapper = createEntityContextWrapper(configuration);

    // when
    const { result } = renderHook(useRegistryFilter, { wrapper });

    // then
    act(() => {
      result.current.handleFieldsChange({ target: { value: "id,city" } } as ChangeEvent<HTMLSelectElement>);
    });
    expect(result.current.searchParameter).toEqual({ query: "", propertyNameList: ["id", "city"] });
  });
});
