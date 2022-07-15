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

import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { act } from "react-dom/test-utils";

import { FormConfigurationProvider } from "../../src";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";

describe("@nrich/form-configuration-core/FormConfigurationProvider", () => {
  it("should not render children if loader is not defined and fetch is not executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);
    const children = "Should not be rendered";

    // when
    const { queryByText } = render(<FormConfigurationProvider url="">{children}</FormConfigurationProvider>);

    // then
    expect(queryByText(children)).not.toBeInTheDocument();
  });

  it("should render loader if loader is defined and fetch is not executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);
    const children = "Should not be rendered";
    const loader = "Loading...";

    // when
    const { queryByText, getByText } = render(<FormConfigurationProvider loader={loader} url="">{children}</FormConfigurationProvider>);

    // then
    expect(queryByText(children)).not.toBeInTheDocument();
    expect(getByText(loader)).toBeInTheDocument();
  });

  it("should render children when fetch is executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);
    const { result } = renderHook(() => useFormConfigurationStore());
    const { setFormConfigurationLoaded } = result.current;
    const children = "Should not be rendered";
    const loader = "Loading...";

    // when
    render(<FormConfigurationProvider loader={loader} url="">{children}</FormConfigurationProvider>);

    // then
    expect(screen.queryByText(children)).not.toBeInTheDocument();
    expect(screen.getByText(loader)).toBeInTheDocument();

    // and when
    act(() => {
      setFormConfigurationLoaded(true);
    });

    // then
    expect(screen.getByText(children)).toBeInTheDocument();
  });
});
