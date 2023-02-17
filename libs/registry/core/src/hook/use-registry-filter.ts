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

import { SearchParameter } from "../api";
import { RegistryEntityContext } from "../component";

/**
 * Initial value for filter fields
 */
const INITIAL_FILTER_VALUE = { query: "", propertyNameList: [] };

/**
 * Return value of {@link useRegistryFilter}. Contains configuration, value and change handlers for registry filter.
 */
interface UseRegistryFilter {
  /**
   * List of available fields for filtering
   */
  availableFields: { value: string, label: string }[];

  /**
   * Current value of request {@link SearchParameter}
   */
  searchParameter: SearchParameter;

  /**
   * Change handler for search fields
   * @param event change event (usually from multiselect field)
   */
  handleFieldsChange: (event: ChangeEvent) => void;

  /**
   * Change handler for query
   * @param event change event (usually from text field)
   */
  handleQueryChange: (event: ChangeEvent) => void;
}

/**
 * Helper hook that handles filtering states for administered registry entity. Only handles fields and leaves refeching to hook user.
 * @param initialFilterValue initial filter value
 */
export const useRegistryFilter = (initialFilterValue: SearchParameter = INITIAL_FILTER_VALUE): UseRegistryFilter => {
  const { finalProperties } = React.useContext(RegistryEntityContext);
  const [searchParameter, setSearchParameter] = React.useState<SearchParameter>(initialFilterValue);

  const handleFieldsChange = (event) => {
    const { value } = event.target;
    const newValue = typeof value === "string" ? value.split(",") : value;
    setSearchParameter((oldSearchParameter) => ({ ...oldSearchParameter, propertyNameList: newValue }));
  };

  const handleQueryChange = (event) => {
    const { value } = event.target;
    setSearchParameter((oldSearchParameter) => ({ ...oldSearchParameter, query: value }));
  };

  const availableFields = React.useMemo(
    () => finalProperties.filter((property) => property.searchable)
      .map((property) => ({ value: property.name, label: property.columnHeader })),
    [finalProperties],
  );

  return {
    availableFields,
    searchParameter,
    handleFieldsChange,
    handleQueryChange,
  };
};
