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

import { useYupFormConfigurationStore } from "../../src/yup/store";
import { mockFormYupConfiguration, mockFormYupConfigurations } from "../testutil/form-configuration-generating-util";

describe("@croz/nrich-form-configuration-core/form-configuration-store", () => {
  it("should set, add and remove form configurations from store", () => {
    // given
    let currentState = useYupFormConfigurationStore.getState();

    const formConfiguration = mockFormYupConfiguration;
    const formConfigurationList = mockFormYupConfigurations;

    // when
    currentState.set(formConfigurationList);

    currentState = useYupFormConfigurationStore.getState();

    // then
    expect(currentState.yupFormConfigurations).toHaveLength(2);
    expect(currentState.yupFormConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.yupFormConfigurations[1]).toMatchObject(formConfigurationList[1]);

    // and when
    currentState.add(formConfiguration);

    currentState = useYupFormConfigurationStore.getState();

    // then
    expect(currentState.yupFormConfigurations).toHaveLength(3);
    expect(currentState.yupFormConfigurations[2]).toMatchObject(formConfiguration);

    // and when
    currentState.remove(currentState.yupFormConfigurations[2]);

    currentState = useYupFormConfigurationStore.getState();

    // then
    expect(currentState.yupFormConfigurations).toHaveLength(2);
    expect(currentState.yupFormConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.yupFormConfigurations[1]).toMatchObject(formConfigurationList[1]);
  });
});
