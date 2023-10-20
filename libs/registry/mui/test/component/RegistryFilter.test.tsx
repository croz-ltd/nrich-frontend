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
  act, fireEvent, render, screen, waitFor,
} from "@testing-library/react";
import React from "react";

import { RegistryFilter } from "../../src";
import { createEntityContextWrapper } from "../testutil/context-util";
import { registryConfigurationMock } from "../testutil/registry-mock";
import { setupTest } from "../testutil/setup-test";

describe("@croz/nrich-registry-mui/component/RegistryFilter", () => {
  setupTest();

  it("should render", () => {
    // given
    const onFilterUpdate = jest.fn();
    const configuration = registryConfigurationMock[0].entityConfigurationList[0];
    const wrapper = createEntityContextWrapper(configuration);

    // when
    render(
      <RegistryFilter onFilterUpdate={onFilterUpdate} />,
      { wrapper },
    );

    // then
    expect(screen.getByRole("button")).toHaveClass("MuiSelect-select");
  });

  it("should fire onFilterUpdate with debounce when search query is changed", async () => {
    // given
    const onFilterUpdate = jest.fn();
    const configuration = registryConfigurationMock[0].entityConfigurationList[0];
    const wrapper = createEntityContextWrapper(configuration);

    // when
    render(
      <RegistryFilter onFilterUpdate={onFilterUpdate} />,
      { wrapper },
    );
    await act(() => fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } }));

    // then
    expect(onFilterUpdate).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(onFilterUpdate).toHaveBeenCalledTimes(1);
    }, { timeout: 400 });
  });

  it("should fire onFilterUpdate with debounce when properties are changed", async () => {
    // given
    const onFilterUpdate = jest.fn();
    const configuration = registryConfigurationMock[0].entityConfigurationList[0];
    const wrapper = createEntityContextWrapper(configuration);

    // when
    render(
      <RegistryFilter onFilterUpdate={onFilterUpdate} />,
      { wrapper },
    );
    await act(() => fireEvent.mouseDown(screen.getByRole("button")));
    await act(() => fireEvent.click(screen.getByText("City")));

    // then
    expect(onFilterUpdate).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(onFilterUpdate).toHaveBeenCalledTimes(1);
    }, { timeout: 400 });
  });
});
