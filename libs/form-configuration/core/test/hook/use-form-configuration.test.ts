import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useFormConfiguration, useYupFormConfiguration } from "../../src";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { mockFormYupConfiguration, mockFormYupConfigurations } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/use-form-configuration", () => {
  beforeEach(() => {
    useFormConfigurationStore.getState().set(mockFormYupConfigurations);
  });

  it("should resolve form configuration state", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formYupConfigurations, formConfigurationLoaded } = result.current;

    // then
    expect(formYupConfigurations).toHaveLength(2);
    expect(formConfigurationLoaded).toBeFalsy();
  });

  it("should add form configuration to store", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formYupConfigurations, add } = result.current;

    // then
    expect(formYupConfigurations).toHaveLength(2);

    // and when
    act(() => {
      add(mockFormYupConfiguration);
    });

    // then
    expect(result.current.formYupConfigurations).toHaveLength(3);
  });

  it("should remove form configuration from store", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formYupConfigurations, remove } = result.current;

    // then
    expect(formYupConfigurations).toHaveLength(2);

    // and when
    act(() => {
      remove(formYupConfigurations[0]);
    });

    // then
    expect(result.current.formYupConfigurations).toHaveLength(1);
  });

  it("should set form configuration loaded flag to store", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formConfigurationLoaded, setFormConfigurationLoaded } = result.current;

    // then
    expect(formConfigurationLoaded).toBeFalsy();

    // and when
    act(() => {
      setFormConfigurationLoaded(true);
    });

    // then
    expect(result.current.formConfigurationLoaded).toBeTruthy();
  });

  it("should return yup object for given formId", () => {
    // when
    const { formId } = mockFormYupConfigurations[0];
    const { result } = renderHook(() => useYupFormConfiguration(formId));

    // then
    expect(result.current).toMatchObject(mockFormYupConfigurations[0].yupSchema);
  });
});
