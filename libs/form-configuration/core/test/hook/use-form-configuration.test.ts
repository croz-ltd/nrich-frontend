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

import { act, renderHook } from "@testing-library/react";

import { useFormConfiguration, useYupFormConfiguration } from "../../src";
import { useFormConfigurationStore } from "../../src/store";
import { mockFormYupConfiguration, mockFormYupConfigurations } from "../testutil/form-configuration-generating-util";

describe("@croz/nrich-form-configuration-core/use-form-configuration", () => {
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

  it("should throw error for unknown formId", () => {
    // when
    const formId = "unknown";
    const { result } = renderHook(() => useYupFormConfiguration(formId));

    // then
    expect(result.error).toEqual(Error("No form configuration found for given formId: unknown"));
  });
});
