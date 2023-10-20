/*
 *    Copyright 2023 CROZ d.o.o, the original author or authors.
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

import React from "react";

import {
  Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Paper, Select, TextField, Typography,
} from "@mui/material";

import {
  findIdField, formatIdName, FormType, RegistryPropertyConfiguration, useRegistryEntity, useRegistryForm,
} from "@croz/nrich-registry-core";

/**
 * Properties for form field
 */
interface FieldProps {
  /**
   * Configuration of the specific property/field
   */
  configuration: RegistryPropertyConfiguration;

  /**
   * Current value of field
   */
  value: any;

  /**
   * Change handler for updating value
   * @param newValue new value of the field
   */
  onChange: (newValue: any) => void;

  /**
   * Error on current field value. Filled on unsuccessful submit, cleared on change
   */
  error: string;
}

/**
 * Field for properties of complex object type. Renders class name and id for options
 * @param configuration Configuration of the specific property/field
 * @param value Current value of field
 * @param onChange Change handler for updating value
 * @param error Error on current field value
 */
const SubEntityField = ({
  configuration, value, onChange, error,
}: FieldProps) => {
  const { entityConfiguration, data } = useRegistryEntity(configuration.singularAssociationReferencedClass, { pageNumber: 0, pageSize: 1000 });

  const idField = findIdField(entityConfiguration);

  return (
    <FormControl size="small">
      <InputLabel id={`${configuration.name}-picker-label`}>{configuration.formLabel}</InputLabel>
      <Select
        labelId={`${configuration.name}-picker-label`}
        id={`${configuration.name}-picker`}
        label={configuration.formLabel}
        value={value?.[idField.name] ?? ""}
        onChange={(event) => onChange({ [idField.name]: event.target.value })}
        error={!!error}
        input={<OutlinedInput />}
      >
        {(data?.content || []).map((option) => (
          <MenuItem key={option[idField.name]} value={option[idField.name]}>
            {formatIdName(entityConfiguration.classFullName, idField.name, option[idField.name])}
          </MenuItem>
        ))}
      </Select>
      {!!error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

/**
 * Main component for a single field which renders specific input based on property javascript type
 * @param configuration Configuration of the specific property/field
 * @param value Current value of field
 * @param onChange Change handler for updating value
 * @param error Error on current field value
 */
const Field = ({
  configuration, value, onChange, error,
}: FieldProps) => {
  switch (configuration.javascriptType) {
    case "string":
      return (
        <TextField
          error={!!error}
          helperText={error}
          label={configuration.formLabel}
          value={value ?? ""}
          size="small"
          onChange={(event) => onChange(event.target.value)}
          disabled={!configuration.editable}
        />
      );
    case "number":
      if (configuration.decimal) {
        return (
          <TextField
            error={!!error}
            helperText={error}
            label={configuration.formLabel}
            value={value ?? ""}
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9.,]*" }}
            disabled={!configuration.editable}
            onChange={(event) => onChange(+event.target.value)}
          />
        );
      }
      return (
        <TextField
          error={!!error}
          helperText={error}
          label={configuration.formLabel}
          value={value ?? ""}
          size="small"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          disabled={!configuration.editable}
          onChange={(event) => onChange(+event.target.value)}
        />
      );
    case "boolean":
      // use switch or checkbox
      return (
        <TextField
          error={!!error}
          helperText={error}
          label={configuration.formLabel}
          value={value ?? ""}
          size="small"
          onChange={(event) => onChange(event.target.value)}
          disabled={!configuration.editable}
        />
      );
    case "object":
      return (
        <SubEntityField configuration={configuration} value={value} onChange={onChange} error={error} />
      );
    case "date":
      return (
        <TextField
          error={!!error}
          helperText={error}
          label={configuration.formLabel}
          value={value?.split("T")[0] ?? ""}
          type="date"
          size="small"
          onChange={(event) => onChange(event.target.value)}
          disabled={!configuration.editable}
          InputLabelProps={{
            shrink: true,
          }}
        />
      );
    default:
      return (
        <TextField
          error={!!error}
          helperText={error}
          label={configuration.formLabel}
          value={value ?? null}
          size="small"
          onChange={(event) => onChange(event.target.value)}
          disabled={!configuration.editable}
        />
      );
  }
};

const paperStyle = {
  display: "flex",
  flexDirection: "column",
  p: 4,
  gap: 2,
};

/**
 * {@link RegistryForm} properties
 */
interface Props {
  /**
   * Initial values of the form. Row data or empty object
   */
  initialValues: any;

  /**
   * Flag if form is currently in create or update mode
   */
  type: FormType;

  /**
   * Handler for submitting values. Called after successful validation of input data
   * @param values
   */
  onSubmit: (values: any) => void;

  /**
   * Handler for closing form, called when user explicitly clicks on cancel button
   */
  onClose: () => void;

}

/**
 * Component which encapsulates create and update forms for single registry entity
 * @param initialValues Initial values of the form. Row data or empty object
 * @param type Flag if form is currently in create or update mode
 * @param onSubmit Handler for submitting values. Called after successful validation of input data
 * @param onClose Handler for closing form, called when user explicitly clicks on cancel button
 */
export const RegistryForm = ({
  initialValues, type, onSubmit, onClose,
}: Props) => {
  const {
    entityConfiguration,
    yupSchema,
    finalInitialValues,
    properties,
  } = useRegistryForm(initialValues, type);

  // form handlers

  const [value, setValue] = React.useState<any>(finalInitialValues);
  const [errors, setErrors] = React.useState<any>({});
  const clearError = (fieldName: string) => {
    setErrors((oldErrors) => ({ ...oldErrors, [fieldName]: undefined }));
  };

  const updateField = (fieldName: string, newValue: any) => {
    setValue((oldValue) => ({ ...oldValue, [fieldName]: newValue }));
    clearError(fieldName);
  };

  const handleSubmit = async () => {
    try {
      await yupSchema.validate(value, { abortEarly: false });
      onSubmit(value);
    }
    catch (e) {
      setErrors(e.inner.reduce((all, error) => ({ ...all, [error.path]: error.message }), {}));
    }
  };

  return (
    <Paper sx={paperStyle}>
      <Typography variant="h5">{type === "update" ? `Update ${entityConfiguration.name}` : `Create ${entityConfiguration.name}`}</Typography>
      {properties.map((field) => (
        <Field key={field.name} configuration={field} value={value[field.name]} onChange={(newValue) => updateField(field.name, newValue)} error={errors[field.name]} />
      ))}
      <Box sx={{ alignSelf: "end" }}>
        <Button variant="outlined" onClick={onClose} sx={{ mr: 2 }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>{type === "update" ? "Update" : "Create"}</Button>
      </Box>
    </Paper>
  );
};
