import React from "react";

import {
  Alert, AlertColor, AlertTitle, Snackbar,
} from "@mui/material";

import { useNotifications } from "@nrich/notification-core";

export type NotificationPosition = | "top-left"
| "top-right"
| "top-center"
| "bottom-left"
| "bottom-right"
| "bottom-center";

export type NotificationOrigin = ["top" | "bottom", "left" | "right" | "center"];

export interface NotificationsProviderProps {
  autoClose?: number;
  position?: NotificationPosition;
}

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
  const positioning = position.split("-") as NotificationOrigin;

  const [notifications, remove] = useNotifications();

  return (
    <>
      {
        notifications.map((notification) => (
          <Snackbar
            key={notification.date}
            open
            autoHideDuration={autoClose}
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
                  {notification.messageList.map((message) => <li>{message}</li>)}
                </ul>
              )}
            </Alert>
          </Snackbar>
        ))
      }
    </>
  );
};

export default Notifications;
