import React from "react";

import {
  Alert, AlertColor, AlertTitle, Snackbar,
} from "@mui/material";

import { Notification, useNotifications } from "@nrich/notification-core";

export type NotificationPosition = "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";

export type NotificationOrigin = ["top" | "bottom", "left" | "right" | "center"];

export interface NotificationsProviderProps {

  /**
   * Number of milliseconds before notification is closed.
   */
  autoClose?: number;

  /**
   * Position of notification.
   */
  position?: NotificationPosition;

}

const resolveNotificationOrigin = (notification: Notification, defaultPosition: NotificationPosition): NotificationOrigin => {
  const separator = "-";
  const position = notification.uxNotificationOptions?.position;

  let notificationOrigin;
  if (typeof position === "string" && position.includes(separator)) {
    notificationOrigin = position as NotificationPosition;
  }
  else {
    notificationOrigin = defaultPosition;
  }

  return notificationOrigin.split(separator) as NotificationOrigin;
};

const resolveNotificationDuration = (notification: Notification, defaultDuration: number): number => {
  const autoClose = notification.uxNotificationOptions?.autoClose;

  return (typeof autoClose === "number" && autoClose) || defaultDuration;
};

/**
 * A provider component used to wrap the container in which the notifications are displayed.
 *
 * @param position specifies the notification position on the page,
 * derived from a set of predefined positions available in MUI
 * @param autoClose the duration after which the notification closes expressed in milliseconds
 * (if left undefined, it doesn't close)
 * @param children the children components from the wrapped component
 */
const Notifications = ({ position = "bottom-right", autoClose }: NotificationsProviderProps) => {
  const { notifications, remove } = useNotifications();

  return (
    <>
      {
        notifications.map((notification) => {
          const positioning = resolveNotificationOrigin(notification, position);
          const autoHideDuration = resolveNotificationDuration(notification, autoClose);

          return (
            <Snackbar
              key={notification.timestamp?.toUTCString()}
              open
              autoHideDuration={autoHideDuration}
              onClose={() => remove(notification)}
              anchorOrigin={{
                vertical: positioning[0],
                horizontal: positioning[1],
              }}
            >

              <Alert
                onClose={() => remove(notification)}
                severity={notification.severity.toLowerCase() as AlertColor}
              >
                <AlertTitle><strong>{notification.title}</strong></AlertTitle>
                {notification.content}
                {notification.messageList?.length > 0 && (
                  <ul>
                    {notification.messageList.map((message) => <li key={message}>{message}</li>)}
                  </ul>
                )}
              </Alert>
            </Snackbar>
          );
        })
      }
    </>
  );
};

export default Notifications;
