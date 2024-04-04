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

import {
  render, renderHook, screen, waitFor,
} from "@testing-library/react";
import React from "react";

import { RegistryProvider, useRegistryConfigurationStore } from "../../src";
import { setupRegistryServer } from "../testutil/setup-registry-server";

const server = setupRegistryServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-registry-core/component/RegistryProvider", () => {
  // @ts-ignore
  it("should render and load configs", async () => {
    // given
    const entityFormatters = { "some.test.entity": (value: { id: number }) => `ID: ${value.id}` };

    // when
    render(
      <RegistryProvider entityFormatters={entityFormatters}>
        <p>Test</p>
      </RegistryProvider>,
    );

    // then
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Test")).toBeInTheDocument();
    }, { timeout: 100 });

    // and when
    const value = renderHook(() => useRegistryConfigurationStore());

    // then
    expect(value.result.current.groupConfigurations).toHaveLength(2);
    expect(value.result.current.entityFormatters).toBeDefined();
  });
});
