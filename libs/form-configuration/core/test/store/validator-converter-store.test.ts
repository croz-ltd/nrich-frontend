import { useValidatorConverterStore } from "../../src/store/validator-converter-store";
import { mockValidatorConverters } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/validator-converter-store", () => {
  it("should set validator converter store", () => {
    // given
    let currentState = useValidatorConverterStore.getState();

    const validatorConverterList = mockValidatorConverters;

    // when
    currentState.set(validatorConverterList);

    currentState = useValidatorConverterStore.getState();

    // then
    expect(currentState.validatorConverters).toHaveLength(2);
    expect(currentState.validatorConverters[0]).toMatchObject(validatorConverterList[0]);
    expect(currentState.validatorConverters[1]).toMatchObject(validatorConverterList[1]);
  });
});
