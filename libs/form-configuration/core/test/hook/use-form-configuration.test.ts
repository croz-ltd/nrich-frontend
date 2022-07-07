import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useFormConfiguration, useYupFormConfiguration } from "../../src";
import { FormConfigurationValidationConverter } from "../../src/converter/FormConfigurationValidationConverter";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { mockFormConfiguration, mockFormConfigurations } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/use-form-configuration", () => {
  beforeEach(() => {
    useFormConfigurationStore.getState().set(mockFormConfigurations);
  });

  it("should resolve form configuration state", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formConfigurations } = result.current;

    // then
    expect(formConfigurations).toHaveLength(2);
  });

  it("should add form configuration to store", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formConfigurations, add } = result.current;

    // then
    expect(formConfigurations).toHaveLength(2);

    // adn when
    act(() => {
      add(mockFormConfiguration);
    });

    // then
    expect(result.current.formConfigurations).toHaveLength(3);
  });

  it("should remove form configuration from store", () => {
    // when
    const { result } = renderHook(() => useFormConfiguration());
    const { formConfigurations, remove } = result.current;

    // then
    expect(formConfigurations).toHaveLength(2);

    // adn when
    act(() => {
      remove(formConfigurations[0]);
    });

    // then
    expect(result.current.formConfigurations).toHaveLength(1);
  });

  it("should return yup object for given formId", () => {
    // given
    const converter = new FormConfigurationValidationConverter();

    // when
    const { formId } = mockFormConfigurations[0];
    const { result } = renderHook(() => useYupFormConfiguration(formId));

    // then
    expect(result.current.describe()).toEqual(converter.convertFormConfigurationToYupSchema(mockFormConfigurations[0].constrainedPropertyConfigurationList).describe());
  });
});
