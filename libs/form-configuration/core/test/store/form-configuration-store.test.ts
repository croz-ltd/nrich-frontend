import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { mockFormYupConfiguration, mockFormYupConfigurations } from "../testutil/form-configuration-generating-util";

describe("@nrich/form-configuration-core/form-configuration-store", () => {
  it("should set, add and remove form configurations from store", () => {
    // given
    let currentState = useFormConfigurationStore.getState();

    const formConfiguration = mockFormYupConfiguration;
    const formConfigurationList = mockFormYupConfigurations;

    // when
    currentState.set(formConfigurationList);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formYupConfigurations).toHaveLength(2);
    expect(currentState.formYupConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.formYupConfigurations[1]).toMatchObject(formConfigurationList[1]);

    // and when
    currentState.add(formConfiguration);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formYupConfigurations).toHaveLength(3);
    expect(currentState.formYupConfigurations[2]).toMatchObject(formConfiguration);

    // and when
    currentState.remove(currentState.formYupConfigurations[2]);

    currentState = useFormConfigurationStore.getState();

    // then
    expect(currentState.formYupConfigurations).toHaveLength(2);
    expect(currentState.formYupConfigurations[0]).toMatchObject(formConfigurationList[0]);
    expect(currentState.formYupConfigurations[1]).toMatchObject(formConfigurationList[1]);
  });
});
