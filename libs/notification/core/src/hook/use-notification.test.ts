import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import { Notification } from "../api";
import { useNotificationStore } from "../store/notification-store";
import { useNotifications } from "./use-notifications";

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

describe("@nrich/notification-core/use-notifications", () => {
  beforeAll(() => {
    mockNotifications.forEach((notification) => useNotificationStore.getState().add(notification));
  });

  it("Correctly resolves notification state", () => {
    const { result } = renderHook(() => useNotifications());
    const { notifications } = result.current;

    expect(notifications).toHaveLength(2);
    expect(notifications[0]).toEqual({ ...mockNotifications[0], timestamp: expect.any(Date) });
    expect(notifications[1]).toEqual({ ...mockNotifications[1], timestamp: expect.any(Date) });
  });

  it("Correctly deletes notification state", () => {
    const { result } = renderHook(() => useNotifications());
    const { notifications, remove } = result.current;

    expect(notifications).toHaveLength(2);

    act(() => {
      remove(notifications[0]);
    });

    expect(result.current.notifications).toHaveLength(1);
  });
});
