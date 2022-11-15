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

import { Notification } from "../../src";
import { useNotificationStore } from "../../src/store/notification-store";

describe("@croz/nrich-notification-core/notification-store", () => {
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
