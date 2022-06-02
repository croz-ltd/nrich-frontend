# nrich-demo-frontend

React application to showcase features of [nrich](https://github.com/croz-ltd/nrich) libraries.

The overall project is built on top of the concept of [Yarn workspaces](https://yarnpkg.com/features/workspaces).

### Development of new modules

When developing a new module, the workspaces are to be organized as in the example:

* `libs/foo-core`, where `foo` is the name of the module matching the naming conventions of the complementary backned module
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


