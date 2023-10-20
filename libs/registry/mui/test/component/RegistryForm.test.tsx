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

import { RegistryForm } from "../../src";
import { createFormAndEntityWrapper } from "../testutil/context-util";
import { registryConfigurationMock, registryListMockAddress } from "../testutil/registry-mock";
import { setupTest } from "../testutil/setup-test";

describe("@croz/nrich-registry-mui/component/RegistryForm", () => {
  setupTest();

  const wrapper = createFormAndEntityWrapper(registryConfigurationMock[0].entityConfigurationList[0]);

  it("should render create form", async () => {
    // when
    render(
      <RegistryForm type="create" initialValues={undefined} onClose={() => null} onSubmit={() => null} />,
      { wrapper },
    );

    // then
    await waitFor(() => {
      expect(screen.getByText("Create Address")).toBeInTheDocument();
      const fields = registryConfigurationMock[0].entityConfigurationList[0].propertyConfigurationList.slice(1);
      // eslint-disable-next-line no-restricted-syntax
      for (const field of fields) {
        expect(screen.getByLabelText(field.formLabel)).toBeInTheDocument();
      }
    }, { timeout: 100 });
  });

  it("fields should reflect input events and submit should be called with correct values", async () => {
    // given
    const onSubmit = jest.fn();

    // when
    await waitFor(() => {
      render(
        <RegistryForm type="create" initialValues={undefined} onClose={() => null} onSubmit={onSubmit} />,
        { wrapper },
      );
    }, { timeout: 100 });

    await act(() => fireEvent.change(screen.getByLabelText("City"), { target: { value: "City 1" } }));

    await act(() => fireEvent.mouseDown(screen.getAllByRole("button")[0]));
    await act(() => fireEvent.click(screen.getByText("Country[id=1]")));

    await act(() => fireEvent.change(screen.getByLabelText("Created date"), { target: { value: "2023-04-24" } }));
    await act(() => fireEvent.change(screen.getByLabelText("Last modified date"), { target: { value: "2023-04-24" } }));
    await act(() => fireEvent.change(screen.getByLabelText("Street"), { target: { value: "Street 1" } }));
    await act(() => fireEvent.change(screen.getByLabelText("Street number"), { target: { value: "123" } }));

    await act(() => fireEvent.click(screen.getByText("Create")));

    // then
    expect(onSubmit).toBeCalledWith({
      id: null,
      city: "City 1",
      country: {
        id: 1,
      },
      createdDate: "2023-04-24",
      lastModifiedDate: "2023-04-24",
      street: "Street 1",
      streetNumber: 123,
    });
  });

  it("should render error messages when form is invalid", async () => {
    // given
    const onSubmit = jest.fn();

    // when
    await waitFor(() => {
      render(
        <RegistryForm type="create" initialValues={undefined} onClose={() => null} onSubmit={onSubmit} />,
        { wrapper },
      );
    }, { timeout: 100 });
    await act(() => fireEvent.click(screen.getByText("Create")));

    // then
    expect(screen.getByText("City is required")).toBeInTheDocument();
  });

  it("should render update form", async () => {
    // given
    const initialValues = registryListMockAddress.content[0];

    // when
    await waitFor(() => {
      render(
        <RegistryForm type="update" initialValues={initialValues} onClose={() => null} onSubmit={() => null} />,
        { wrapper },
      );
    }, { timeout: 100 });

    // then
    expect(screen.getByText("Update Address")).toBeInTheDocument();
    const fields = registryConfigurationMock[0].entityConfigurationList[0].propertyConfigurationList;

    // eslint-disable-next-line no-restricted-syntax
    for (const field of fields) {
      expect(screen.getByLabelText(field.formLabel)).toBeInTheDocument();
    }

    expect(screen.getByLabelText("Id").getAttribute("value")).toBe(initialValues.id.toString());
    expect(screen.getByLabelText("City").getAttribute("value")).toBe(initialValues.city);
    expect(screen.getByLabelText("Street").getAttribute("value")).toBe(initialValues.street);
  });
});
