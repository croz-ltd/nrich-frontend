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

import { useRegistryConfigurationStore } from "../../src";
import { useEntityConfiguration } from "../../src/hook/use-entity-configuration";
import { registryConfigurationMock } from "../testutil/registry-mock";

describe("@croz/nrich-registry-core/use-entity-configuration", () => {
  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should fetch configuration by simple name", () => {
    // given
    const name = "Address";

    // when
    const { result } = renderHook(() => useEntityConfiguration(name));

    // then
    expect(result.current.entityConfiguration.name).toEqual(name);
    expect(result.current.entityConfiguration.propertyConfigurationList.length).toBeGreaterThan(0);
    expect(result.current.entityIdProperty.name).toEqual("id");
  });

  it("should fetch configuration by full class name", () => {
    // given
    const className = "net.croz.nrichdemobackend.registry.model.Address";

    // when
    const { result } = renderHook(() => useEntityConfiguration(className));

    // then
    expect(result.current.entityConfiguration.classFullName).toEqual(className);
    expect(result.current.entityConfiguration.propertyConfigurationList.length).toBeGreaterThan(0);
    expect(result.current.entityIdProperty.name).toEqual("id");
  });

  it("should return undefined if no configuration exists", () => {
    // given
    const name = "NonExistentEntity";

    // when
    const { result } = renderHook(() => useEntityConfiguration(name));

    // then
    expect(result.current).toEqual(undefined);
  });
});
