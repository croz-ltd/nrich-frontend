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
  FormControl, InputLabel, MenuItem, OutlinedInput, Select,
} from "@mui/material";

import { useRegistryConfigurationStore } from "@croz/nrich-registry-core";

/**
 * {@link RegistryEntityPicker} properties
 */
interface Props {
  /**
   * Currently picked entity name
   */
  value: string;

  /**
   * Change handler for entity
   * @param newValue
   */
  setValue: (newValue: string) => void;
}

/**
 * Simple dropdown with all entity configurations.
 * @param value Currently picked entity name
 * @param setValue Change handler for entity
 */
export const RegistryEntityPicker = ({ value, setValue }: Props) => {
  const entityConfigurations = useRegistryConfigurationStore((state) => state.groupConfigurations
    .flatMap((groupConfiguration) => groupConfiguration.entityConfigurationList));

  return (
    <FormControl sx={{ m: 1, width: 300 }} size="small">
      <InputLabel id="registry-entity-picker-label">Entity</InputLabel>
      <Select
        labelId="registry-entity-picker-label"
        id="registry-entity-picker"
        label="Entity"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        input={<OutlinedInput />}
      >
        {entityConfigurations.map((entity) => (
          <MenuItem key={entity.name} value={entity.name}>
            {entity.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
