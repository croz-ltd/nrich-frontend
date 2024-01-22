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

import { rest } from "msw";
import { setupServer, SetupServerApi } from "msw/node";

export const setupNotificationServer = (): SetupServerApi => setupServer(
  rest.get("/with-notification", (_, response, context) => response(context.json(
    {
      notification: {
        title: "Title",
        content: "Content",
        severity: "WARNING",
      },
      data: {
        success: true,
      },
    },
  ))),

  rest.get("/without-notification", (_, response, context) => response(context.json(
    { success: true },
  ))),

  rest.get("/with-plain-text", (_, response, context) => response(context.text(
    "plain text",
  ))),
);
