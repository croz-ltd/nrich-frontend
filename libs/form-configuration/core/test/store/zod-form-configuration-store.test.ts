/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
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

import { useZodFormConfigurationStore } from "../../src/zod/store";
import { mockFormZodConfiguration, mockFormZodConfigurations } from "../testutil/form-configuration-generating-util";

describe("@croz/nrich-form-configuration-core/form-configuration-store", () => {
  it("should set, add and remove form configurations from store", () => {
    // given
    let currentState = useZodFormConfigurationStore.getState();

    const formConfiguration = mockFormZodConfiguration;
    const formConfigurationList = mockFormZodConfigurations;

    // when
    currentState.set(formConfigurationList);

    currentState = useZodFormConfigurationStore.getState();

    // then
    expect(currentState.zodFormConfigurations).toHaveLength(2);
    expect(currentState.zodFormConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.zodFormConfigurations[1]).toMatchObject(formConfigurationList[1]);

    // and when
    currentState.add(formConfiguration);

    currentState = useZodFormConfigurationStore.getState();

    // then
    expect(currentState.zodFormConfigurations).toHaveLength(3);
    expect(currentState.zodFormConfigurations[2]).toMatchObject(formConfiguration);

    // and when
    currentState.remove(currentState.zodFormConfigurations[2]);

    currentState = useZodFormConfigurationStore.getState();

    // then
    expect(currentState.zodFormConfigurations).toHaveLength(2);
    expect(currentState.zodFormConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.zodFormConfigurations[1]).toMatchObject(formConfigurationList[1]);
  });
});
