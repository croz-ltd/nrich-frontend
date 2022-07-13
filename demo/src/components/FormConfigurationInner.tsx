import { Form, Formik } from "formik";
import React, { useState } from "react";

import {
  Button, Grid, MenuItem, Select,
} from "@mui/material";

import { useFormConfiguration, useYupFormConfiguration } from "@nrich/form-configuration-core";

import {
  createInitialValues, generateForm, LooseObject,
} from "../util/formUtils";

export const FormConfigurationInner = () => {
  const [formValues, setFormValues] = useState<LooseObject>();

  const { formYupConfigurations } = useFormConfiguration();

  const [select, setSelect] = useState(formYupConfigurations[0]?.formId);

  const validationSchema = useYupFormConfiguration(select);

  return (
    <>
      <Select value={select} onChange={(e) => setSelect(e.target.value as string)}>
        {formYupConfigurations.map((fc) => (<MenuItem value={fc.formId} key={fc.formId}>{fc.formId}</MenuItem>))}
      </Select>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8} lg={3}>
          <Formik
            initialValues={createInitialValues(formYupConfigurations.find((item) => item.formId === select)?.yupSchema)}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setFormValues(values);
            }}
            enableReinitialize
          >
            <Form>
              {generateForm(formYupConfigurations.find((item) => item.formId === select)?.yupSchema)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={{ marginTop: "15px" }}
              >
                Submit
              </Button>
            </Form>
          </Formik>
        </Grid>
      </Grid>
      {formValues && (
      <>
        Form values:
        {Object.entries(formValues).map(([key, value]) => <div>{`${key}: ${value}`}</div>)}
      </>
      )}
    </>
  );
};
