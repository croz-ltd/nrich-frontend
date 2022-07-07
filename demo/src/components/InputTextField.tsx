import { TextField } from "@material-ui/core";
import { FieldAttributes, useField } from "formik";
import React, { FC } from "react";

export const InputTextField: FC<FieldAttributes<any>> = ({
  label,
  id,
  type,
  ...props
}) => {
  const [field, meta] = useField<any>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label={label}
      id={id}
      type={type}
      name={field.name}
      value={field.value}
      onBlur={field.onBlur}
      onChange={field.onChange}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
