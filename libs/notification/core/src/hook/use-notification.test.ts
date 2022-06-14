import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";
import { useNotifications } from "./use-notifications";
import { useStore } from "../store/store";
import { NotificationResponse } from "../api/notification/types";

const mockNotifications: NotificationResponse[] = [
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
    mockNotifications.forEach((notification) => useStore.getState().push(notification));
  });

  it("Correctly resolves notification state", () => {
    const { result } = renderHook(() => useNotifications());

    const notifications = result.current[0];

    expect(notifications).toHaveLength(2);
    expect(notifications[0]).toEqual({ ...mockNotifications[0], date: expect.any(Number) });
    expect(notifications[1]).toEqual({ ...mockNotifications[1], date: expect.any(Number) });
  });

  it("Correctly deletes notification state", () => {
    const { result } = renderHook(() => useNotifications());

    const remove = result.current[1];

    expect(result.current[0]).toHaveLength(2);

    act(() => {
      remove(result.current[0][0]);
    });

    expect(result.current[0]).toHaveLength(1);
  });
});
