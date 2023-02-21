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

import { renderHook } from "@testing-library/react";

import { RegistryPropertyConfiguration, SortProperty, useRegistrySort } from "../../src";

describe("@croz/nrich-registry-core/use-registry-sort", () => {
  it("should return no sorting on empty value", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [];
    const onChange = () => {
    };

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange));

    // then
    expect(result.current.sortDirection).toEqual(undefined);
  });

  it("should switch sorting from none to asc when change handler is called", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [];
    const onChange = jest.fn();

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange));
    result.current.sortChangeHandler();

    // then
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([{ property: "title", direction: "ASC" }]);
  });

  it("should switch sorting from asc to desc when change handler is called", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [{ property: "title", direction: "ASC" }] as SortProperty[];
    const onChange = jest.fn();

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange));
    result.current.sortChangeHandler();

    // then
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([{ property: "title", direction: "DESC" }]);
  });

  it("should switch sorting from desc to none when change handler is called", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [{ property: "title", direction: "DESC" }] as SortProperty[];
    const onChange = jest.fn();

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange));
    result.current.sortChangeHandler();

    // then
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([]);
  });

  it("should add additional sorting to input array by default", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [{ property: "id", direction: "DESC" }] as SortProperty[];
    const onChange = jest.fn();

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange));
    result.current.sortChangeHandler();

    // then
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([{ property: "id", direction: "DESC" }, { property: "title", direction: "ASC" }]);
  });

  it("should add replace current sorting if allowMultiple is false", () => {
    // given
    const propertyConfiguration = { name: "title", sortable: true } as RegistryPropertyConfiguration;
    const sortPropertyValue = [{ property: "id", direction: "DESC" }] as SortProperty[];
    const onChange = jest.fn();

    // when
    const { result } = renderHook(() => useRegistrySort(propertyConfiguration, sortPropertyValue, onChange, false));
    result.current.sortChangeHandler();

    // then
    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith([{ property: "title", direction: "ASC" }]);
  });
});
