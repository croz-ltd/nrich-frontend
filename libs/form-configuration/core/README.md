# @nrich/form-configuration-core

## Overview

`@nrich/form-configuration-core` is a modules for generating automatic validations for forms in the application.
It's a frontend part of [nrich-form-configuration](https://github.com/croz-ltd/nrich/tree/master/nrich-form-configuration) backend module.
Together, they allow the user to define validations in a single place (backend).

For validation schemas this lib uses [yup](https://github.com/jquense/yup).

## Setup

To use this module in your project run `npm install @nrich/form-configuration-core` or `yarn add @nrich/form-configuration-core`

## Basic usage

On some upper level of your app, wrap your components in `FormConfigurationProvider`.

```tsx
import { FormConfigurationProvider } from "@nrich/form-configuration-core";

const App = () => (
  <FormConfigurationProvider loader="Loading...">
    {/* rest of the app... */}
  </FormConfigurationProvider>
);
```

In your form component, use `useYupFormConfiguration` with your form id defined on backend.

```tsx
import React, { useState } from "react";
import { useYupFormConfiguration } from "@nrich/form-configuration-core";
import { Form, Formik } from "formik";


export const SomeFormComponent = () => {
  const [formValues, setFormValues] = useState({});
  const validationSchema = useYupFormConfiguration('user.create-form');

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values) => setFormValues(values)}
    >
      <Form>
        { /* Rest of the form */ }
      </Form>
    </Formik>
  );
};
```
*NOTE: Formik is used just as an example, you can use any form lib compatible with `yup`.*

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
import { FormConfigurationProvider } from "@nrich/form-configuration-core";

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
