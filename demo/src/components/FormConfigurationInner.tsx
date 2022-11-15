/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import { Form, Formik } from "formik";
import React, { useState } from "react";

import {
  Button, Grid, MenuItem, Select,
} from "@mui/material";

import { useFormConfiguration, useYupFormConfiguration } from "@croz/nrich-form-configuration-core";

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
