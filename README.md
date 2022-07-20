# nrich-demo-frontend

React application to showcase features of [nrich](https://github.com/croz-ltd/nrich) libraries.

The overall project is built on top of the concept of [Yarn workspaces](https://yarnpkg.com/features/workspaces).

### Workspace/module overview

Workspace is divided in `demo` and `libs` subcategories.
`demo` project is a showcase application for the all nrich frontend modules. Application uses [MUI](https://mui.com/) as primary
frontend widget library.

`libs` contains implementation of specific modules separated in two categories. First is a `core` module which contains common logic
and custom hooks for the module. Second are adapters for specific UI component library, currently only `mui`.

The following workspaces/modules are available:
* [libs/notification/core](libs/notification/core/README.md) - contains the core utilities for handling common state operations for the nrich notification module
* [libs/notification/mui](libs/notification/mui/README.md) - contains the UI implementation of notifications for the MUI component library
* `libs/form-configuration/core` - contains the core utilities for using nrich form-configuration module

### Development of new modules

When developing a new module, the workspaces are to be organized as in the example:

* `libs/foo-core`, where `foo` is the name of the module matching the naming conventions of the complementary backend module
* `libs/foo-bar`, where `foo` is the name of the module matching the naming conventions of the complementary backend module, and `bar`
is the name of the UI component library

### Common commands

#### Build

To build all modules, run `yarn build all`.

To build specific module(s), run `yarn build foo bar`, where `foo` and `bar` are the module names (e.g. `@nrich/notification-core`).
This specific command receives a variable number of arguments.

For more details, run `yarn build --help`.

#### Lint

To execute the linting process in a read-only mode (without actually affecting the files), run `yarn lint`.

To automatically apply changes, run `yarn lint --fix`.

#### Test

To run tests, use `yarn jest`.


