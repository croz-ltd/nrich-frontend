import { fetchFormConfigurations } from "../../src";
import { useFormConfigurationStore } from "../../src/store/form-configuration-store";
import { useValidatorConverterStore } from "../../src/store/validator-converter-store";
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
    const validationConverterState = useValidatorConverterStore.getState();

    // then
    expect(formConfigurationState.formConfigurations).toHaveLength(2);
    expect(formConfigurationState.formConfigurations[0]).toMatchObject(mockFormConfigurations[0]);
    expect(formConfigurationState.formConfigurations[1]).toMatchObject(mockFormConfigurations[1]);

    expect(validationConverterState.validatorConverters).toHaveLength(2);
    expect(validationConverterState.validatorConverters[0]).toMatchObject(mockValidatorConverters[0]);
    expect(validationConverterState.validatorConverters[1]).toMatchObject(mockValidatorConverters[1]);

    // cleanup
    formConfigurationState.set([]);
  });
});
