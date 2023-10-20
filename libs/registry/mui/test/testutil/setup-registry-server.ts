/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

import { RegistryRequest } from "@croz/nrich-registry-core";

import {
  formConfigurationMock, registryConfigurationMock, registryListMockAddress, registryListMockCountry,
} from "./registry-mock";

export const setupRegistryServer = (): SetupServerApi => setupServer(
  rest.post("/nrich/registry/configuration/fetch", (_, response, context) => response(context.json(registryConfigurationMock))),

  rest.post("/nrich/registry/data/list", async (request, response, context) => {
    const requestJson = await request.json() as RegistryRequest;
    if (requestJson.classFullName === "net.croz.nrichdemobackend.registry.model.Address") {
      return response(context.json(registryListMockAddress));
    }
    if (requestJson.classFullName === "net.croz.nrichdemobackend.registry.model.Country") {
      return response(context.json(registryListMockCountry));
    }
    return response(context.status(404));
  }),

  rest.post("/nrich/form/configuration/fetch-all", (_, response, context) => response(context.json(formConfigurationMock))),
);
