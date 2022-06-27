import { isNotificationResponse } from "../api/notification-type-guards";
import { useNotificationStore } from "../store/notification-store";

/**
 * XHR interceptor which listens for the response to be acquired
 * and checks whether the response matches the proposed notification format.
 *
 * @returns A function which can be called to register the interceptor.
 */
export const xhrNotificationInterceptor = () => {
  const old = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (...args) {
    this.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const body = JSON.parse(this.responseText);
        if (isNotificationResponse(body)) {
          useNotificationStore.getState().add(body.notification);
        }
      }
    }, false);
    // @ts-ignore
    old.apply(this, args);
  };
};
