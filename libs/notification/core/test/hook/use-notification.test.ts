import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { Notification, useNotifications } from "../../src";
import { useNotificationStore } from "../../src/store/notification-store";

const mockNotifications: Notification[] = [
  {
    title: "Action with manual resolving",
    content: "Action with manual resolving was successful.",
    messageList: [],
    severity: "INFO",
  },
  {
    title: "Action with notification resolved from request and additional data",
    content: "Action with notification resolved from request and additional data was successful with warnings.",
    messageList: [],
    severity: "WARNING",
    uxNotificationOptions: {},
  },
];

describe("@nrich/notification-core/use-notification", () => {
  beforeAll(() => {
    mockNotifications.forEach((notification) => useNotificationStore.getState().add(notification));
  });

  it("should resolve notification state", () => {
    // when
    const { result } = renderHook(() => useNotifications());
    const { notifications } = result.current;

    // then
    expect(notifications).toHaveLength(2);
    expect(notifications[0]).toEqual({ ...notifications[0], timestamp: expect.any(Date) });
    expect(notifications[1]).toEqual({ ...notifications[1], timestamp: expect.any(Date) });
  });

  it("should delete notification state", () => {
    // when
    const { result } = renderHook(() => useNotifications());
    const { notifications, remove } = result.current;

    // then
    expect(notifications).toHaveLength(2);

    // and when
    act(() => {
      remove(notifications[0]);
      remove(notifications[1]);
    });

    // then
    expect(result.current.notifications).toHaveLength(0);
  });
});
