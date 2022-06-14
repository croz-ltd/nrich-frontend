import create from "zustand";
import { NotificationResponse } from "../api/notification/types";

export type Notification = NotificationResponse & {
  date: number;
};

export interface NotificationState {
  notifications: Notification[];
  push: (notification: NotificationResponse) => void;
  remove: (notification: Notification) => void;
}

/**
 * Creation of the API for managing internal notification state.
 * Used internally in the {@link useNotifications} hook.
 *
 * @returns A hook for managing notification state usable in a React environment.
 */
export const useStore = create<NotificationState>((set) => ({
  notifications: [],
  push: (notification) => set((state) => ({
    notifications: [...state.notifications, { ...notification, date: Date.now() }],
  })),
  remove: (notification) => set((state) => ({
    notifications: state.notifications.filter((n) => n !== notification),
  })),
}));
