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
    notifications: [...state.notifications, { ...notification, timestamp: notification.timestamp || new Date() }],
  })),
  remove: (notification) => set((state) => ({
    notifications: state.notifications.filter((currentNotification) => currentNotification !== notification),
  })),
}));