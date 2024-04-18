# @croz/nrich-notification-core

## Overview

`@croz/nrich-notification-core` is a module that is designed for showing automatic messages from the backend on the user interface.
It's the frontend part of [nrich-notification](https://github.com/croz-ltd/nrich/tree/master/nrich-notification) backend module.

Internally, it intercepts http calls and scans for sign of nrich notification object, and shows the notification if it exists.

## Setup

To use this module in your project run `npm install @croz/nrich-notification-core` or `yarn add @croz/nrich-notification-core`

## Usage

1. On the top level of your app, register an appropriate interceptor for notifications.
   - If you use fetch API or a lib that uses fetch internally, use `fetchNotificationInterceptor()`.
   - If you use a lib that uses `XMLHttpRequest`, e.g. `axios`, use `xhrNotificationInterceptor()`.

2. Using the `useNotification()` custom hook you get an object containing `notifications` array and `remove` and `add` methods for working with that array. Alternatively, you can use the standalone `removeNotification` and `addNotification` methods if the hook variant is not fit for your use-case.

Example:

```tsx
import { useNotifications } from "@croz/nrich-notification-core";

const Notification = ({ title, content, onRemove }) => (
  <div>
    <h3>{title}</h3>
    <div>{content}</div>
    <button onClick={onRemove}>×</button>
  </div>
)

export const Notifications = () => {
  const { notifications, remove } = useNotifications();

  return (
    <div>
      {notifications.map(notification => <Notification {...notification} onRemove={() => remove(notification)}/>)}
    </div>
  )
}
```

If you're using this module alone, you need to provide your own notification UI. For the prepared implementation in MUI, see [@croz/nrich-notification-mui](../mui/README.md) docs
