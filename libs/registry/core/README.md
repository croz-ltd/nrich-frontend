# @croz/nrich-registry-core

## Overview

`@croz/nrich-registry-core` is a module which enables administration of registries. It provides main hooks for
loading registry data, adding new, updating existing and deleting unwanted entities.
It's a frontend part of [nrich-registry](https://github.com/croz-ltd/nrich/blob/master/nrich-registry/README.md) backend module.

For create and update forms, it relies on [nrich-form-configuration](https://github.com/croz-ltd/nrich-frontend/blob/master/libs/form-configuration/core/README.md) module.

## Setup

To use this module in your project run `npm install @croz/nrich-registry-core` or `yarn add @croz/nrich-registry-core`

## Usage

1. On the app level where your registry administration will be, use `RegistryProvider` which loads configurations.

```tsx
import { RegistryProvider } from "@croz/nrich-registry-core";

const RegistryAdministration = () => (
  <RegistryProvider>
    {/* rest of the administration part... */}
  </RegistryProvider>
);
```

2. Use available hooks to add logic for your administration. Hook can be used in your own components, or you can use already available Material UI implementation from
   [@croz/nrich-registry-mui](../mui/README.md)

Available hooks are:

| hook name                            | usage                                                                                               |
|--------------------------------------|-----------------------------------------------------------------------------------------------------|
| `useRegistryEntityAdministration`    | Main hook for whole administration, use at top level entity administration component                |
| `useRegistryEntity`                  | Handles lower level stuff as data handling and configuration fetching                               |
| `useRegistryFilter`                  | Contains useful handlers for search query and filter properties                                     |
| `useRegistryForm`                    | Returns final configuration (field and validation) and initial values for creating add/update forms |
| `useRegistryEntityFormConfiguration` | Fetches Yup form configuration                                                                      |
| `useRegistrySort`                    | Helps with sorting logic in table headers                                                           |

