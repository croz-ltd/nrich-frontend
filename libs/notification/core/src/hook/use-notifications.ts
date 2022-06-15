import { Notification } from "../api";
import { useStore } from "../store/store";

export type UseNotifications = () => { notifications: Notification[], add: (notification: Notification) => void, remove: (notification: Notification) => void };

/**
 * A hook which simplifies the usage of the intercepted notification state.
 * Uses the internal {@link useStore} hook for managing the notification state.
 *
 * @returns An array of options to access the notification state and remove a single notification.
 */
export const useNotifications: UseNotifications = () => {
  const notifications = useStore((state) => state.notifications);
  const add = useStore((state) => state.add);
  const remove = useStore((state) => state.remove);

  return { notifications, add, remove };
};
