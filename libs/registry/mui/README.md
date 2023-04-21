# @croz/nrich-registry-mui

## Overview

`@croz/nrich-registry-mui` is a [MUI](https://mui.com/) wrapper for the [@croz/nrich-registry-core](../core/README.md) module.
Module uses generic MUI components to provide basic functionality for registry administration.

## Setup

To use this module in your project run `npm install @croz/nrich-registry-mui` or `yarn add @croz/nrich-registry-mui`

## Usage

In your app, inside your registry administration, use `RegistryProvider` which loads configurations.
Be vary that you also need `FormConfigurationProvider` somewhere in the tree so that form validations are loaded.
Inside the `RegistryProvider` you can use `RegistryEntity` component which encapsulates display with filtering, actions for adding, editing and removing entities.

```tsx
<FormConfigurationProvider>
  <RegistryProvider>
    <RegistryEntity entityName="Address"/>
  </RegistryProvider>
</FormConfigurationProvider>
```

If you want to customize the display, or use some part from the `RegistryEntity` component, you can also use `RegistryTable`, `RegistryFilter` and `RegistryForm` components together with
`useRegistryEntityAdministration` hook.

There is also a `RegistryEntityPicker` component which can be used to pick an entity from a list of available entities.

List of component and which hooks they use internally:

| Component name         | Description                                                       | Used hook                                     |
|------------------------|-------------------------------------------------------------------|-----------------------------------------------|
| `RegistryEntity`       | Main component which encapsulates whole entity administration     | `useRegistryEntityAdministration`             |
| `RegistryTable`        | Table with data, with filtering and sorting                       | `useRegistryEntityContext`, `useRegistrySort` |
| `RegistryFilter`       | Search input and filter properties                                | `useRegistryFilter`                           |
| `RegistryForm`         | Form for adding and updating entities                             | `useRegistryEntity`, `useRegistryForm`        |
| `RegistryEntityPicker` | Component for picking an entity from a list of available entities | `useRegistryConfigurationStore`               |

