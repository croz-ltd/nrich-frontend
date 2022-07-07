import { Notification } from "../../src";
import { useNotificationStore } from "../../src/store/notification-store";

describe("@nrich/notification-core/notification-store", () => {
  it("should add and remove notifications from store", () => {
    // given
    let currentState = useNotificationStore.getState();

    const notification = {
      title: "title",
      content: "content",
      messageList: [],
      severity: "ERROR",
      timestamp: new Date(),
    } as Notification;

    // when
    currentState.add(notification);

    currentState = useNotificationStore.getState();

    // then
    expect(currentState.notifications).toHaveLength(1);
    expect(currentState.notifications[0]).toMatchObject(notification);

    // and when
    currentState.remove(currentState.notifications[0]);

    currentState = useNotificationStore.getState();

    // then
    expect(currentState.notifications).toHaveLength(0);
  });
});
