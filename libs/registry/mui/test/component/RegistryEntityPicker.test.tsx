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

import { RegistryEntityPicker } from "../../src";
import { registryConfigurationMock } from "../testutil/registry-mock";
import { setupTest } from "../testutil/setup-test";

describe("@croz/nrich-registry-mui/component/RegistryEntityPicker", () => {
  setupTest();

  it("should render and show all options", () => {
    // given
    const value = "";
    const setValue = jest.fn();

    // when
    render(
      <RegistryEntityPicker value={value} setValue={setValue} />,
    );

    // then
    expect(screen.getByRole("button")).toHaveClass("MuiSelect-select");

    // and when
    fireEvent.mouseDown(screen.getByRole("button"));

    // then
    const entities = registryConfigurationMock.flatMap((group) => group.entityConfigurationList);
    entities.forEach((entity) => {
      expect(screen.getByText(entity.name)).toBeInTheDocument();
    });
  });

  it("should call setValue when option is chosen", async () => {
    // given
    const value = "";
    const setValue = jest.fn();

    // when
    render(
      <RegistryEntityPicker value={value} setValue={setValue} />,
    );
    await act(() => fireEvent.mouseDown(screen.getByRole("button")));
    await act(() => fireEvent.click(screen.getByText("Address")));

    // then
    expect(setValue).toHaveBeenCalledWith("Address");
  });
});
