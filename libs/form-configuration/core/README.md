# @croz/nrich-form-configuration-core

## Overview

`@croz/nrich-form-configuration-core` is a module for generating automatic validations for forms in the application.
It's a frontend part of [nrich-form-configuration](https://github.com/croz-ltd/nrich/tree/master/nrich-form-configuration) backend module.
Together, they allow the user to define validations in a single place (backend).

This library supports the use of [yup](https://github.com/jquense/yup) and [zod](https://github.com/colinhacks/zod) validation schemas.

## Setup

To use this module in your project run `npm install @croz/nrich-form-configuration-core` or `yarn add @croz/nrich-form-configuration-core`

## Validation library support
This library supports both `yup` and `zod` validation schemas.

- Yup and Zod are optional peer dependencies

- Install only the validation library you plan to use

## Basic usage

Wrap your application with a form configuration provider to ensure form configuration
is loaded before rendering any forms.

Choose the provider based on the validation library you want to use.

### Yup provider

```tsx
import { FormConfigurationProvider } from "@croz/nrich-form-configuration-core";

const App = () => (
  <FormConfigurationProvider loader="Loading...">
    {/* rest of the app... */}
  </FormConfigurationProvider>
);
```

### Zod provider

```tsx
import { FormConfigurationZodProvider } from "@croz/nrich-form-configuration-core/zod";

const App = () => (
  <FormConfigurationZodProvider loader="Loading...">
    {/* rest of the app... */}
  </FormConfigurationZodProvider>
);
```

Use the hook corresponding to the chosen validation library and provide
the form ID defined on the backend.



#### Yup

```tsx
import { useYupFormConfiguration } from "@croz/nrich-form-configuration-core";
```

#### Zod

```tsx
import { useZodFormConfiguration } from "@croz/nrich-form-configuration-core/zod";
```

Apart from the hook import, usage is identical for both `yup` and `zod`.

```tsx
import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useYupFormConfiguration } from "@croz/nrich-form-configuration-core";
// or import { useZodFormConfiguration } from "@croz/nrich-form-configuration-core/zod";

type CreateForm = {
  /* fields of the form */
};

export const SomeFormComponent = () => {
  const [formValues, setFormValues] = useState({});

  const validationSchema =
    useYupFormConfiguration<CreateForm>("user.create-form");
  // or: useZodFormConfiguration<CreateForm>("user.create-form")

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => setFormValues(values)}
    >
      <Form>
        {/* Rest of the form */}
      </Form>
    </Formik>
  );
};
```

*NOTE: Formik is used just as an example, you can use any form lib compatible with `yup` and `zod`.*

## Details

`FormConfigurationProvider` component has the following props:

| Prop name                     | Description                                                           | Required | Default value               |
|-------------------------------|-----------------------------------------------------------------------|----------|-----------------------------|
| children                      | Component tree that will be using nrich form configuration            | yes      | none                        |
| loader                        | Custom component used while waiting for configuration fetch to finish | no       | none                        |
| url                           | Backend form configuration path                                       | no       | `/nrich/form/configuration` |
| requestOptionsResolver        | Function that creates options for the initial fetch call to backend   | no       | none                        |
| additionalValidatorConverters | List of `ValidatorConverter`s used to allow custom validations        | no       | none                        |

### Registering and using custom validations

For custom validations to work, you need to provide a `ValidatorConverter` for it. `ValidatorConverter` contains two fields `supports` and `convert`.

`supports` is used to check if this is the correct validation for a given form validation configuration, while `convert` serves as an implementation of the
validation. `convert` will usually use the yup's [Schema.test](https://github.com/jquense/yup#schematestname-string-message-string--function--any-test-function-schema) method.

```tsx
import oib from "oib.js";
import { FormConfigurationProvider } from "@croz/nrich-form-configuration-core";

const additionalValidatorConverters = [
  {
    supports: (configuration) => configuration.name === "ValidOib",
    convert: (configuration, validator) => validator.test("validOib", configuration.errorMessage, value => oib.validate(value))
  }
];

const getRequestParams = (): RequestInit => ({
  headers: {
    Authorization: "Bearer token",
  },
});

const App = () => (
  <FormConfigurationProvider loader="Loading..."
                             additionalValidatorConverters={additionalValidatorConverters}
                             requestOptionsResolver={getRequestParams}>
    {/* rest of the app... */}
  </FormConfigurationProvider>
);
```
