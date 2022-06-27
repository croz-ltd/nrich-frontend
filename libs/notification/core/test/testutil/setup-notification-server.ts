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
);
