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

import { RegistryTable } from "../../src";
import { createEntityContextWrapper } from "../testutil/context-util";
import { registryConfigurationMock, registryListMockAddress } from "../testutil/registry-mock";
import { setupTest } from "../testutil/setup-test";

describe("@croz/nrich-registry-mui/component/RegistryTable", () => {
  setupTest();

  const request = {
    classFullName: registryConfigurationMock[0].entityConfigurationList[0].classFullName,
    pageNumber: 0,
    pageSize: 10,
  };
  const wrapper = createEntityContextWrapper(registryConfigurationMock[0].entityConfigurationList[0]);

  it("should render with all the columns", () => {
    // when
    render(
      <RegistryTable
        data={registryListMockAddress}
        onEdit={() => null}
        onRemove={() => null}
        onRequestChange={() => null}
        request={request}
      />,
      { wrapper },
    );

    // then
    expect(screen.getByRole("table")).toBeInTheDocument();
    const fields = registryConfigurationMock[0].entityConfigurationList[0].propertyConfigurationList;
    fields.forEach((field) => {
      expect(screen.getByText(field.columnHeader)).toBeInTheDocument();
    });
  });

  it("should call edit function on edit button click", async () => {
    // given
    const onEdit = jest.fn();

    // when
    waitFor(() => {
      render(
        <RegistryTable
          data={registryListMockAddress}
          onEdit={onEdit}
          onRemove={() => null}
          onRequestChange={() => null}
          request={request}
        />,
        { wrapper },
      );
    }, { timeout: 100 });
    await act(() => fireEvent.click(screen.getAllByTestId("EditIcon")[0].parentElement));

    // then
    expect(onEdit).toBeCalledTimes(1);
  });

  it("should call remove function on remove button click", async () => {
    // given
    const onRemove = jest.fn();

    // when
    render(
      <RegistryTable
        data={registryListMockAddress}
        onEdit={() => null}
        onRemove={onRemove}
        onRequestChange={() => null}
        request={request}
      />,
      { wrapper },
    );
    await act(() => fireEvent.click(screen.getAllByTestId("DeleteIcon")[0].parentElement));

    // then
    expect(onRemove).toBeCalledTimes(1);
  });
});
