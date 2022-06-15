import { isNotificationResponse } from "../api/notification-type-guards";
import { useNotificationStore } from "../store/notification-store";

/**
 * Fetch API interceptor which clones the response and checks
 * whether the response matches the proposed notification format.
 *
 * @returns A function which can be called to register the interceptor.
 */
export const fetchNotificationInterceptor = () => {
  window.fetch = new Proxy(window.fetch, {
    apply(fetch, that, request) {
      // @ts-ignore
      const result = fetch.apply(that, request);

      result.then((response) => response.clone().json())
        .then((body) => {
          if (isNotificationResponse(body)) {
            useNotificationStore.getState().add(body.notification);
          }
        });

      return result;
    },
  });
};
