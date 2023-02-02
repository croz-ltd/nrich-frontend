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

import { act, renderHook } from "@testing-library/react";

import { Notification, useNotifications } from "../../src";
import { useNotificationStore } from "../../src/store";

const mockNotifications: Notification[] = [
  {
    title: "Action with manual resolving",
    content: "Action with manual resolving was successful.",
    messageList: [],
    severity: "INFO",
    timestamp: new Date(),
  },
  {
    title: "Action with notification resolved from request and additional data",
    content: "Action with notification resolved from request and additional data was successful with warnings.",
    messageList: [],
    severity: "WARNING",
    uxNotificationOptions: {},
    timestamp: new Date(),
  },
];

describe("@croz/nrich-notification-core/use-notification", () => {
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
