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
