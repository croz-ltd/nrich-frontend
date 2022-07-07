import { renderHook } from "@testing-library/react-hooks";

import { useValidatorConverter } from "../../src";
import { useValidatorConverterStore } from "../../src/store/validator-converter-store";
import { mockValidatorConverters } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/use-validator-converter", () => {
  beforeAll(() => {
    useValidatorConverterStore.getState().set(mockValidatorConverters);
  });

  it("should resolve validator converter state", () => {
    // when
    const { result } = renderHook(() => useValidatorConverter());
    const { validatorConverters } = result.current;

    // then
    expect(validatorConverters).toHaveLength(2);
  });
});
