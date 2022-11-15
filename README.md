[![Build](https://github.com/croz-ltd/nrich-frontend/actions/workflows/build.yml/badge.svg)](https://github.com/croz-ltd/nrich-frontend/actions/workflows/build.yml)
[![codecov](https://codecov.io/github/croz-ltd/nrich-frontend/branch/master/graph/badge.svg?token=3GULYJWSXF)](https://codecov.io/github/croz-ltd/nrich-frontend)
[![License](https://img.shields.io/github/license/croz-ltd/nrich?color=yellow&logo=apache)](https://github.com/croz-ltd/nrich/blob/master/LICENSE)

![npm (scoped)](https://img.shields.io/npm/v/@croz/nrich-form-configuration-core?color=yellowgreen&label=@croz/nrich-form-configuration-core)
![npm (scoped)](https://img.shields.io/npm/v/@croz/nrich-notification-core?color=blueviolet&label=@croz/nrich-notification-core)
![npm (scoped)](https://img.shields.io/npm/v/@croz/nrich-notification-mui?color=orange&label=@croz/nrich-notification-mui)

# nrich-frontend

React application to showcase features of [nrich](https://github.com/croz-ltd/nrich) libraries.

The overall project is built on top of the concept of [Yarn workspaces](https://yarnpkg.com/features/workspaces) using [Turborepo](https://turbo.build/repo) as a build management system.

### Workspace/module overview

Workspace is divided in `config` and `libs` subcategories.
`config` contains common configuration used throughout the `libs` implementations.

`libs` contains implementation of specific modules separated in two categories. First is a `core` module which contains common logic
and custom hooks for the module. Second are adapters for specific UI component library, currently only `mui`.

The following workspaces/modules are available:
* [@croz/nrich-form-configuration-core](libs/form-configuration/core/README.md) - contains the core utilities for using nrich form-configuration module
* [@croz/nrich-notification-core](libs/notification/core/README.md) - contains the core utilities for handling common state operations for the nrich notification module
* [@croz/nrich-notification-mui](libs/notification/mui/README.md) - contains the UI implementation of notifications for the MUI component library

### Development of new modules

When developing a new module, the workspaces are to be organized as in the example:

* `libs/foo-core`, where `foo` is the name of the module matching the naming conventions of the complementary backend module
* `libs/foo-bar`, where `foo` is the name of the module matching the naming conventions of the complementary backend module, and `bar`
is the name of the UI component library

### Common commands

#### Build

To build all modules, run `yarn build`.

To build specific module(s), run `yarn build -filter=foo`, where `foo` is the workspace name (e.g. `@croz/nrich-notification-core`).
This specific command receives a variable number of arguments.

#### Clean

To clean build artifacts, run `yarn clean`.

#### Lint

To execute the linting process in a read-only mode (without actually affecting the files), run `yarn lint`.

To automatically apply changes, run `yarn lint --fix`.

#### Test

To run tests, use `yarn test`.


