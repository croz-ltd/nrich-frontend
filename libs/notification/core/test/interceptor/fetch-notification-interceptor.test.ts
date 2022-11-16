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

import { fetchNotificationInterceptor } from "../../src";
import { useNotificationStore } from "../../src/store";
import { setupNotificationServer } from "../testutil/setup-notification-server";

const server = setupNotificationServer();

beforeAll(() => {
  server.listen();
  fetchNotificationInterceptor();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("@croz/nrich-notification-core/fetch-notification-interceptor", () => {
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
