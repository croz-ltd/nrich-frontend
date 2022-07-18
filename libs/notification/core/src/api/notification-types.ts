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

export type NotificationSeverity = "INFO" | "WARNING" | "ERROR";

export interface Notification {

  /**
   * Title of the notification.
   */
  title: string;

  /**
   * Content of the notification (i.e. for exception
   * notification this will contain resolved message for exception or 'Error occurred' text).
   */
  content: string;

  /**
   * List of messages (i.e. for validation failure notification
   * this will contain all validation failure messages).
   */
  messageList: string[];

  /**
   * Severity indicating importance of notification.
   */
  severity: NotificationSeverity;

  /**
   * Custom override data sent from the server. Each component library will have its own data here.
   * For example current supported options in mui implementation are position and autoClose.
   */
  uxNotificationOptions?: Record<string, unknown>;

  /**
   * Timestamp of notification.
   */
  timestamp: Date
}

export interface NotificationResponse {

  /**
   * Notification
   */
  notification: Notification

}
