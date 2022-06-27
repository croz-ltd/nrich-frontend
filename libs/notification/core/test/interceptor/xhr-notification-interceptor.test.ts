import axios from "axios";

import { xhrNotificationInterceptor } from "../../src";
import { useNotificationStore } from "../../src/store/notification-store";
import { setupNotificationServer } from "../testutil/setup-notification-server";

const server = setupNotificationServer();

beforeAll(() => {
  server.listen();
  xhrNotificationInterceptor();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@nrich/notification-core/xhr-notification-interceptor", () => {
  it("should resolve notification", async () => {
    // when
    const response = await axios.get("/with-notification");

    // then
    expect(response).toBeDefined();
    expect(response.data.data).toMatchObject({ success: true });

    // and when
    const notificationState = useNotificationStore.getState();

    // then
    expect(notificationState.notifications).toHaveLength(1);
    expect(notificationState.notifications[0]).toMatchObject({ title: "Title", content: "Content", severity: "WARNING" });

    // cleanup
    notificationState.remove(notificationState.notifications[0]);
  });

  it("should ignore responses without notification", async () => {
    // when
    const response = await axios.get("/without-notification");

    // then
    expect(response).toBeDefined();
    expect(response.data).toMatchObject({ success: true });

    // and when
    const notificationState = useNotificationStore.getState();

    // then
    expect(notificationState.notifications).toHaveLength(0);
  });
});
