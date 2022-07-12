import React from "react";
import * as yup from "yup";

import { InputTextField } from "../components/InputTextField";

export interface LooseObject {
  [key: string]: string | number | undefined;
}

export function createInitialValues(
  yupSchema?: yup.ObjectSchema<any>,
) {
  const init: LooseObject = {};
  Object.keys(yupSchema?.fields).forEach((item) => {
    init[item] = "";
  });
  return init;
}

export function generateForm(yupSchema?: yup.ObjectSchema<any>) {
  return (
    <div>
      {Object.keys(yupSchema?.fields).map((item) => (
        <InputTextField
          key={item}
          name={item}
          id={item}
          label={item.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
        />
      ))}
    </div>
  );
}
