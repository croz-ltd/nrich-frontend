import React from "react";

import { ConstrainedPropertyConfiguration } from "@nrich/form-configuration-core";

import { InputTextField } from "../components/InputTextField";

export interface LooseObject {
  [key: string]: string | number | undefined;
}

export function createInitialValues(
  constrainedPropertyConfigurationList?: ConstrainedPropertyConfiguration[],
) {
  const init: LooseObject = {};
  constrainedPropertyConfigurationList?.forEach((item) => {
    init[item.path] = "";
  });
  return init;
}

export function generateForm(constrainedPropertyConfigurationList?: ConstrainedPropertyConfiguration[]) {
  return (
    <div>
      {constrainedPropertyConfigurationList?.map((item) => (
        <InputTextField
          key={item.path}
          name={item.path}
          id={item.path}
          label={item.path.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
        />
      ))}
    </div>
  );
}
