import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

import { mockFormConfigurations } from "./form-configuration-generating-util";

export const setupFormConfigurationServer = (): SetupServerApi => setupServer(
  rest.post("/test-url/fetch-all", (_, response, context) => response(context.json(
    mockFormConfigurations,
  ))),
);
