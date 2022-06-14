export type NotificationSeverity = "INFO" | "WARNING" | "ERROR";

export interface NotificationResponse {
  title: string;
  content: string;
  messageList: string[];
  severity: NotificationSeverity;
  uxNotificationOptions?: Record<string, unknown>;
}

export interface NotificationDataResponse<T> {
  data: T,
  notification: NotificationResponse
}
