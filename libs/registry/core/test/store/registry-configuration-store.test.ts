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

import { useRegistryConfigurationStore } from "../../src/store";
import { registryConfigurationMock } from "../testutil/registry-mock";

describe("@croz/nrich-registry-core/registry-configuration-store", () => {
  it("should create and update store configuration", () => {
    // given
    let currentState = useRegistryConfigurationStore.getState();

    // when
    currentState.load(registryConfigurationMock);

    // then
    currentState = useRegistryConfigurationStore.getState();

    expect(currentState.groupConfigurations).toHaveLength(registryConfigurationMock.length);
    expect(currentState.groupConfigurations[0].groupId).toEqual(registryConfigurationMock[0].groupId);
    expect(currentState.groupConfigurations[0].entityConfigurationList.length).toEqual(registryConfigurationMock[0].entityConfigurationList.length);
    expect(currentState.groupConfigurations[1].groupId).toEqual(registryConfigurationMock[1].groupId);
    expect(currentState.groupConfigurations[1].entityConfigurationList.length).toEqual(registryConfigurationMock[1].entityConfigurationList.length);
  });
});
