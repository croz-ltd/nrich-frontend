import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import React from "react";
import { act } from "react-dom/test-utils";

import { FormConfigurationWrapper } from "../../src";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";

describe("@nrich/form-configuration-core/FormConfigurationWrapper", () => {
  it("should not render children if loader is not defined and fetch is not executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);

    // when
    const children = "Should not be rendered";
    const { queryByText } = render(<FormConfigurationWrapper>{children}</FormConfigurationWrapper>);

    // then
    expect(queryByText(children)).not.toBeInTheDocument();
  });

  it("should render loader if loader is defined and fetch is not executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);

    // when
    const children = "Should not be rendered";
    const loader = "Loading...";
    const { queryByText, getByText } = render(<FormConfigurationWrapper loader={loader}>{children}</FormConfigurationWrapper>);

    // then
    expect(queryByText(children)).not.toBeInTheDocument();
    expect(getByText(loader)).toBeInTheDocument();
  });

  it("should render loader if loader is defined and fetch is not executed", () => {
    // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);

    // when
    const children = "Children";
    const loader = "Loading...";
    const { queryByText, getByText } = render(<FormConfigurationWrapper loader={loader}>{children}</FormConfigurationWrapper>);

    // then
    expect(queryByText(children)).not.toBeInTheDocument();
    expect(getByText(loader)).toBeInTheDocument();
  });

  it("should render children when fetch is executed", () => { // given
    useFormConfigurationStore.getState().setFormConfigurationLoaded(false);
    const { result } = renderHook(() => useFormConfigurationStore());
    const { setFormConfigurationLoaded } = result.current;

    // when
    const children = "Should not be rendered";
    const loader = "Loading...";
    render(<FormConfigurationWrapper loader={loader}>{children}</FormConfigurationWrapper>);

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
