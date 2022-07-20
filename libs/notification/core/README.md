# @nrich/notification-core

## Overview

`@nrich/notification-core` is a module which serves for showing automatic messages from backend on user interface.
It's a frontend part of [nrich-notification](https://github.com/croz-ltd/nrich/tree/master/nrich-notification) backend module.

Internally, it 'spies' http calls and scans for sign of nrich notification object, and shows it if it exists.

## Setup

To use this module in your project run `npm install @nrich/notification-core` or `yarn add @nrich/notification-mui`

## Usage

1. On top level of your app, register an appropriate interceptor for notifications.
   - If you use fetch API or a lib that uses fetch internally, use `fetchNotificationInterceptor()`.
   - If you use a lib that uses `XMLHttpRequest`, eg. `axios`, use `xhrNotificationInterceptor()`.

2. Using  `useNotification()` custom hook you get an object containing `notifications` array and `remove` and `add` methods for working with that array.

Example:

```tsx
import { useNotifications } from "@nrich/notification-core";

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

If you're using only this module alone, you need to provide your own notification UI. For the prepared implementation in MUI, see [@nrich/notification-mui](../mui/README.md) docs
