import { Notification } from "../api";
import { useStore } from "../store/store";

export type UseNotifications = () => [Notification[], (notification: Notification) => void];

/**
 * A hook which simplifies the usage of the intercepted notification state.
 * Uses the internal {@link useStore} hook for managing the notification state.
 *
 * @returns An array of options to access the notification state and remove a single notification.
 */
export const useNotifications: UseNotifications = () => {
  const notifications = useStore((state) => state.notifications);
  const remove = useStore((state) => state.remove);

  return [notifications, remove];
};
