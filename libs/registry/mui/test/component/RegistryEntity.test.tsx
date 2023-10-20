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
  act, fireEvent, render, screen,
} from "@testing-library/react";
import React from "react";

import { RegistryEntity } from "../../src";
import { setupTest } from "../testutil/setup-test";

describe("@croz/nrich-registry-mui/component/RegistryEntity", () => {
  setupTest();

  it("should render", () => {
    // when
    render(
      <RegistryEntity entityName="Address" />,
    );

    // then
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("should open form on Add click", async () => {
    // when
    render(
      <RegistryEntity entityName="Address" />,
    );
    await act(() => fireEvent.click(screen.getByText("Add")));

    // then
    expect(screen.getByText("Create Address")).toBeInTheDocument();
  });
});
