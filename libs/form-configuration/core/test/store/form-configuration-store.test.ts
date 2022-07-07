import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { mockFormConfiguration, mockFormConfigurations } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/form-configuration-store", () => {
  it("should set, add and remove form configurations from store", () => {
    // given
    let currentState = useFormConfigurationStore.getState();

    const formConfiguration = mockFormConfiguration;
    const formConfigurationList = mockFormConfigurations;

    // when
    currentState.set(formConfigurationList);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formConfigurations).toHaveLength(2);
    expect(currentState.formConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.formConfigurations[1]).toMatchObject(formConfigurationList[1]);

    // and when
    currentState.add(formConfiguration);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formConfigurations).toHaveLength(3);
    expect(currentState.formConfigurations[2]).toMatchObject(formConfiguration);

    // and when
    currentState.remove(currentState.formConfigurations[2]);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formConfigurations).toHaveLength(2);
    expect(currentState.formConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.formConfigurations[1]).toMatchObject(formConfigurationList[1]);
  });
});
