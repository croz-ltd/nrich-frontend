import { NotificationResponse } from "./notification-types";

/**
 * Checks whether the given response matches the proposed notification format,
 * i.e. if it contains 'notification' nested object.
 *
 * Used internally in {@link fetchNotificationInterceptor} and {@link xhrNotificationInterceptor}.
 *
 * @param body the response body
 */
export const isNotificationResponse = (body: any): body is NotificationResponse => body && "notification" in body;