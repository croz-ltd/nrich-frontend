import { isNotification } from "../api/type-guards";
import { useStore } from "../store/store";

/**
 * XHR interceptor which listens for the response to be acquired
 * and checks whether the response matches the proposed notification format.
 *
 * @returns A function which can be called to register the interceptor.
 */
export const xhrInterceptor = () => {
  const old = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (...args) {
    this.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        const body = JSON.parse(this.responseText);
        if (isNotification(body)) {
          useStore.getState().push(body.notification);
        }
      }
    }, false);
    // @ts-ignore
    old.apply(this, args);
  };
};
