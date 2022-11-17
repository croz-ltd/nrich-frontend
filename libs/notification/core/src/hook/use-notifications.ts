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

import { Notification } from "../api";
import { useNotificationStore } from "../store";

export type NotificationOptions = {
  /**
   * Array of current state notifications.
   */
  notifications: Notification[],
  /**
   * Adds notification to state.
   * @param notification notification to add
   */
  add: (notification: Notification) => void,
  /**
   * Removes notification from state.
   * @param notification
   */
  remove: (notification: Notification) => void
};
export type UseNotifications = () => NotificationOptions;
/**
 * A hook which simplifies the usage of the intercepted notification state.
 * Uses the internal {@link useNotificationStore} hook for managing the notification state.
 *
 * @returns An array of options to access the notification state and remove a single notification.
 */
export const useNotifications: UseNotifications = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const add = useNotificationStore((state) => state.add);
  const remove = useNotificationStore((state) => state.remove);

  return { notifications, add, remove };
};
