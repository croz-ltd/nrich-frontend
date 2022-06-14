import { NotificationDataResponse } from "./notification/types";

/**
 * Checks whether the given response matches the proposed notification format,
 * i.e. if it contains 'notification' and 'data' nested objects.
 *
 * Used internally in {@link fetchInterceptor} and {@link xhrInterceptor}.
 *
 * @param body the response body
 */
export const isNotification = (body: any): body is NotificationDataResponse<unknown> => body && "notification" in body && "data" in body;
