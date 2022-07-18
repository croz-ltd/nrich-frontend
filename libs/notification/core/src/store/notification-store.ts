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

import create from "zustand";

import { Notification } from "../api";

export interface NotificationState {

  /**
   * Array of current state notifications.
   */
  notifications: Notification[];

  /**
   * Adds notification to state.
   * @param notification notification to add
   */
  add: (notification: Notification) => void;

  /**
   * Removes notification from state.
   * @param notification
   */
  remove: (notification: Notification) => void;

}

/**
 * Creation of the API for managing internal notification state.
 * Used internally in the {@link useNotifications} hook.
 *
 * @returns A hook for managing notification state usable in a React environment.
 */
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  add: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, timestamp: new Date(notification.timestamp) || new Date() }],
  })),
  remove: (notification) => set((state) => ({
    notifications: state.notifications.filter((currentNotification) => currentNotification !== notification),
  })),
}));
