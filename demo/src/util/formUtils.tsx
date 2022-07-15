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
