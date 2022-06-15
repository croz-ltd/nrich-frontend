import { isNotificationResponse } from "../api/type-guards";
import { useStore } from "../store/store";

/**
 * Fetch API interceptor which clones the response and checks
 * whether the response matches the proposed notification format.
 *
 * @returns A function which can be called to register the interceptor.
 */
export const fetchInterceptor = () => {
  window.fetch = new Proxy(window.fetch, {
    apply(fetch, that, request) {
      // @ts-ignore
      const result = fetch.apply(that, request);

      result.then((response) => response.clone().json())
        .then((body) => {
          if (isNotificationResponse(body)) {
            useStore.getState().push(body.notification);
          }
        });

      return result;
    },
  });
};
