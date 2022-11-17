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

import { fetchFormConfigurations } from "../../src/loader";
import { useFormConfigurationStore } from "../../src/store";
import { mockFormConfigurations, mockValidatorConverters } from "../testutil/form-configuration-generating-util";
import { setupFormConfigurationServer } from "../testutil/setup-form-configuration-server";

const server = setupFormConfigurationServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-form-configuration-core/fetch-form-configurations", () => {
  it("should resolve form configurations", async () => {
    // when
    const response = await fetchFormConfigurations({ url: "/test-url", additionalValidatorConverters: mockValidatorConverters });

    // then
    expect(response).toBeDefined();
    expect(response).toMatchObject(mockFormConfigurations);

    // and when
    const formConfigurationState = useFormConfigurationStore.getState();

    // then
    expect(formConfigurationState.formYupConfigurations).toHaveLength(2);
    expect(formConfigurationState.formYupConfigurations[0]).toBeTruthy();
    expect(formConfigurationState.formYupConfigurations[1]).toBeTruthy();

    // cleanup
    formConfigurationState.set([]);
  });
});
