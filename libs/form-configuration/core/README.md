# @nrich/form-configuration-core

## Overview

`@nrich/form-configuration-core` is a modules for generating automatic validations for forms in the application.
It's a frontend part of [nrich-form-configuration](https://github.com/croz-ltd/nrich/tree/master/nrich-form-configuration) backend module.
Together, they allow the user to define validations on a single place (backend).

For validation schemas this lib uses [yup](https://github.com/jquense/yup).

## Setup

To use this module in your project run `npm install @nrich/form-configuration-core` or `yarn add @nrich/form-configuration-core`

## Usage

On some upper level of your app, wrap your components in `FormConfigurationProvider`.

```tsx
import { FormConfigurationProvider } from "@nrich/form-configuration-core";

const App = () => (
  <FormConfigurationProvider loader="Loading..." url="/nrich/form/configuration">
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
