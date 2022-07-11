import { fetchFormConfigurations } from "../../src/loader/fetch-form-configurations";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { mockFormConfigurations, mockValidatorConverters } from "../testutil/form-configuration-generating-util";
import { setupFormConfigurationServer } from "../testutil/setup-form-configuration-server";

const server = setupFormConfigurationServer();

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@nrich/form-configuration-core/fetch-form-configurations", () => {
  it("should resolve form configurations", async () => {
    // when
    const response = await fetchFormConfigurations({ url: "/test-url", additionalValidatorConverters: mockValidatorConverters });

    // then
    expect(response).toBeDefined();
    expect(response).toMatchObject(mockFormConfigurations);

    // and when
    const formConfigurationState = useFormConfigurationStore.getState();

    // then
    expect(formConfigurationState.formYupConfigurations).toHaveLength(2);
    expect(formConfigurationState.formYupConfigurations[0]).toBeTruthy();
    expect(formConfigurationState.formYupConfigurations[1]).toBeTruthy();

    // cleanup
    formConfigurationState.set([]);
  });
});
