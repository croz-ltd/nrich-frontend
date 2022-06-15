export type NotificationSeverity = "INFO" | "WARNING" | "ERROR";

export interface NotificationResponse {

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
}

export interface NotificationDataResponse<T> {

  /**
   * Response data
   */
  data: T,

  /**
   * Notification
   */
  notification: NotificationResponse
}
