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

import { RegistryPropertyConfiguration, SortDirection, SortProperty } from "../api";

/**
 * Return value of {@link useRegistrySort} hook. Contains state and sort handler which uses natural flow for sorting (asc -> desc -> none)
 */
interface UseRegistrySort {
  /**
   * Current sort direction. Undefined if no sort is applied.
   */
  sortDirection?: SortDirection,

  /**
   * Change handler for sort, usually triggered on table header click. Changes sorting to next state. (asc -> desc -> none)
   */
  sortChangeHandler: () => void,
}

/**
 * Helper hook used for table headers to add functionality of sorting by specific field
 * @param propertyConfiguration configuration of the column property
 * @param value current list of sort properties
 * @param onChange change handler to be called with new sort properties
 * @param allowMultiple flag if multiple properties can be sorted at the same time. Default is true
 */
export const useRegistrySort = (
  propertyConfiguration: RegistryPropertyConfiguration,
  value: SortProperty[],
  onChange: (newValue: SortProperty[]) => void,
  allowMultiple: boolean = true,
): UseRegistrySort => {
  const sortDirection = React.useMemo(() => {
    const sortProperty = value.find((pagingRequestSortProperty) => pagingRequestSortProperty.property === propertyConfiguration.name);
    if (sortProperty === undefined) {
      return undefined;
    }
    return sortProperty.direction;
  }, [propertyConfiguration, value]);

  const sortChangeHandler = () => {
    const sortProperty = value.find((pagingRequestSortProperty) => pagingRequestSortProperty.property === propertyConfiguration.name);
    if (sortProperty === undefined) {
      onChange([
        ...(allowMultiple ? value : []),
        { property: propertyConfiguration.name, direction: "ASC" },
      ]);
    }
    else if (sortProperty.direction === "ASC") {
      onChange(value.map((pagingRequestSortProperty) => {
        if (pagingRequestSortProperty.property === propertyConfiguration.name) {
          return { ...pagingRequestSortProperty, direction: "DESC" };
        }
        return pagingRequestSortProperty;
      }));
    }
    else {
      onChange(value.filter((pagingRequestSortProperty) => pagingRequestSortProperty.property !== propertyConfiguration.name));
    }
  };

  return {
    sortDirection,
    sortChangeHandler,
  };
};
