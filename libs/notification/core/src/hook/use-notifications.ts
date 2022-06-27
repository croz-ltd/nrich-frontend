import { Notification } from "../api";
import { useNotificationStore } from "../store/notification-store";

export type UseNotifications = () => { notifications: Notification[], add: (notification: Notification) => void, remove: (notification: Notification) => void };

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
