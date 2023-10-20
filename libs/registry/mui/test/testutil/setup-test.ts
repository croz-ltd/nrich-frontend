import { useRegistryConfigurationStore } from "@croz/nrich-registry-core";

import { registryConfigurationMock } from "./registry-mock";
import { setupRegistryServer } from "./setup-registry-server";

export function setupTest() {
  const server = setupRegistryServer();

  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    useRegistryConfigurationStore.getState().load(registryConfigurationMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    server.resetHandlers();
  });

  afterAll(() => server.close());
}
