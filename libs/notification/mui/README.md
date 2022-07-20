# @nrich/notification-mui

## Overview

`@nrich/notification-mui` is a [MUI](https://mui.com/) wrapper for the [@nrich/notification-core](../core/README.md) module.
For the display of the notifications a `Snackbar` and `Alert` are used.

## Setup

To use this module in your project run `npm install @nrich/notification-mui` or `yarn add @nrich/notification-mui`

## Usage

1. Add `Notifications` component on a part of your app, usually  on `App` or some other higher level component.

```tsx
import { Notifications } from "@nrich/notification-mui";

const App = () => {
  return (
    <div>
      <Notifications autoClose={3000} position="top-right"/>
      {/* other components... */}
    </div>
  )
}
```

Available props for the `Notifications` component are:

| Prop name | Description                                                                                                                                                                           | Possible values                                                                           | Default value  |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|----------------|
| autoClose | The duration after which the notification closes <br> expressed in milliseconds. If left undefined, it doesn't close.                                                                 | number in milliseconds, or `undefined`                                                    | `undefined`    |
| position  | Specifies the notification position on the page, <br> derived from a set of predefined positions available in [MUI](https://mui.com/material-ui/react-snackbar/#positioned-snackbars) | `top-left`, `top-center`, `top-right`, <br>`bottom-left`, `bottom-center`, `bottom-right` | `bottom-right` |


