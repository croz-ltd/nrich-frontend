import { fetchNotificationInterceptor } from "../../src";
import { useNotificationStore } from "../../src/store/notification-store";
import { setupNotificationServer } from "../testutil/setup-notification-server";

const server = setupNotificationServer();

beforeAll(() => {
  server.listen();
  fetchNotificationInterceptor();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@nrich/notification-core/fetch-notification-interceptor", () => {
  it("should resolve notification", async () => {
    // when
    const response = await fetch("/with-notification");
    const parsedResponse = await response.json();

    // then
    expect(parsedResponse).toBeDefined();
    expect(parsedResponse.data).toMatchObject({ success: true });

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
    const response = await fetch("/without-notification");
    const parsedResponse = await response.json();

    // then
    expect(parsedResponse).toBeDefined();
    expect(parsedResponse).toMatchObject({ success: true });

    // and when
    const notificationState = useNotificationStore.getState();

    // then
    expect(notificationState.notifications).toHaveLength(0);
  });
});
