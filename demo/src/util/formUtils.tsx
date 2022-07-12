import React from "react";
import * as yup from "yup";

import { InputTextField } from "../components/InputTextField";

export interface LooseObject {
  [key: string]: string | number | undefined;
}

function getFields(yupSchema?: yup.ObjectSchema<any>) {
  const arr: string[] = [];
  Object.entries(yupSchema?.fields).forEach(([key, value]) => {
    // @ts-ignore
    if (value.type === "object") {
      // @ts-ignore
      Object.keys(value?.fields).forEach((innerKey) => {
        arr.push(`${key}.${innerKey}`);
      });
    }
    else {
      arr.push(key);
    }
  });
  return arr;
}

export function createInitialValues(
  yupSchema?: yup.ObjectSchema<any>,
) {
  const init: LooseObject = {};
  const fields = getFields(yupSchema);
  fields.forEach((item) => {
    init[item] = "";
  });
  return init;
}

export function generateForm(yupSchema?: yup.ObjectSchema<any>) {
  const fields = getFields(yupSchema);
  return (
    <div>
      {fields.map((item) => (
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
