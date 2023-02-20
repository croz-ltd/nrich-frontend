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

import React, { ChangeEvent } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select,
} from "@mui/material";

import { SearchParameter, useDebouncedUpdateEffect, useRegistryFilter } from "@croz/nrich-registry-core";

/**
 * {@link RegistryFilter} properties
 */
interface Props {
  /**
   * Change handler to be called when filter updates
   * @param searchParameter new search values
   */
  onFilterUpdate: (searchParameter: SearchParameter) => void;
}

/**
 * Component for basic filtering. Has input field for query and dropdown with filterable properties.
 * @param onFilterUpdate Change handler to be called when filter updates
 */
export const RegistryFilter = ({ onFilterUpdate }: Props) => {
  const {
    availableFields,
    searchParameter,
    handleFieldsChange,
    handleQueryChange,
  } = useRegistryFilter();

  useDebouncedUpdateEffect(() => {
    onFilterUpdate(searchParameter);
  }, 300, [searchParameter]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel htmlFor="search-query">Search...</InputLabel>
        <OutlinedInput
          id="search-query"
          value={searchParameter.query}
          onChange={handleQueryChange}
          label="Search..."
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )}
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }} size="small">
        <InputLabel id="demo-multiple-name-label">Properties</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          label="Properties"
          value={searchParameter.propertyNameList}
          onChange={(event) => handleFieldsChange(event as ChangeEvent)}
          input={<OutlinedInput />}
        >
          {availableFields.map((field) => (
            <MenuItem key={field.value} value={field.value}>
              {field.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
