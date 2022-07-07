import { Button, Grid } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { fetchFormConfigurations, useYupValidation } from "@nrich/form-configuration-core";

import { InputTextField } from "../components/InputTextField";

type FormValues = {
  city: string, street: string, streetNumber?: number
};

const FormConfiguration = () => {
  const [formValues, setFormValues] = useState<FormValues>();

  useEffect(() => {
    fetchFormConfigurations({ url: "/nrich/form/configuration" });
  }, []);

  const validationSchema = useYupValidation("net.croz.nrichdemobackend.registry.model.Address:::create");

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8} lg={3}>
          <Formik
            initialValues={{ city: "", street: "", streetNumber: undefined }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setFormValues(values);
            }}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <InputTextField
                  id="streetNumber"
                  label="Street number"
                  name="streetNumber"
                />
                <InputTextField
                  id="street"
                  label="Street"
                  name="street"
                />
                <InputTextField
                  id="city"
                  label="City"
                  name="city"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
      {formValues && (
        <>
          Form values:
          {` ${formValues.street} ${formValues.streetNumber}, ${formValues.city}`}
        </>
      )}
    </>
  );
};

export default FormConfiguration;
