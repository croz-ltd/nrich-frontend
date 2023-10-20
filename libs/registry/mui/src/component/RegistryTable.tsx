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

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Paper, SortDirection as MuiSortDirection, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, } from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";

import {
  EntityRegistryRequest,
  findIdField,
  formatIdName,
  RegistryEntityConfiguration,
  RegistryPropertyConfiguration,
  RegistryResponse,
  resolveId,
  resolveValue,
  SortProperty,
  useRegistryEntityContext,
  useRegistrySort,
} from "@croz/nrich-registry-core";

/**
 * {@link RegistryTableHeadCell} properties
 */
interface RegistryTableHeadProps {
  /**
   * Configuration of the property
   */
  property: RegistryPropertyConfiguration;

  /**
   * Current value for sorting configuration
   */
  sortPropertyList: SortProperty[];

  /**
   * Change handler for sorting configuration
   * @param sortPropertyList new sorting configuration
   */
  onSortChange: (sortPropertyList: SortProperty[]) => void;
}

/**
 * Header cell of a property. Renders sorting button if this property
 * @param property configuration of the property
 * @param sortPropertyList current value for sorting configuration
 * @param onSortChange change handler for sorting configuration
 */
const RegistryTableHeadCell = ({property, sortPropertyList, onSortChange}: RegistryTableHeadProps) => {
  const {
    sortDirection,
    sortChangeHandler,
  } = useRegistrySort(property, sortPropertyList, onSortChange);

  const muiSortDirection = sortDirection === undefined ? false : sortDirection.toLowerCase() as MuiSortDirection;

  return (
    <TableCell
      key={property.name}
      sortDirection={muiSortDirection}
    >
      <TableSortLabel
        active={muiSortDirection !== false}
        direction={muiSortDirection !== false ? muiSortDirection : undefined}
        onClick={property.sortable ? () => sortChangeHandler() : () => {
        }}
      >
        {property.columnHeader}
      </TableSortLabel>
    </TableCell>
  );
};

/**
 * {@link PropertyCell} properties
 */
interface PropertyCellProps {
  /**
   * Configuration of specific data property
   */
  propertyConfiguration: RegistryPropertyConfiguration;

  /**
   * Value of property
   */
  value: any;

  /**
   * Map with registry entity subentities (on which this entity depends). Used for rendering complex objects
   */
  subEntityMap: Record<string, RegistryEntityConfiguration>;
}

/**
 * Single cell in the registry table. Renders value based on javascript type
 * @param propertyConfiguration configuration of specific data property
 * @param value value of property
 * @param subEntityMap map with registry entity subentities
 */
const PropertyCell = ({propertyConfiguration, value, subEntityMap}: PropertyCellProps) => {
  let stringValue = value;
  if (value === undefined || value === null) {
    stringValue = "-";
  } else if (propertyConfiguration.javascriptType === "object") {
    const configuration = subEntityMap[propertyConfiguration.singularAssociationReferencedClass];
    const idField = findIdField(configuration);
    stringValue = formatIdName(configuration.classFullName, idField.name, value[idField.name]);
  } else if (propertyConfiguration.javascriptType === "date") {
    stringValue = new Date(value).toLocaleDateString();
  } else if (propertyConfiguration.javascriptType === "number") {
    if (propertyConfiguration.decimal) {
      stringValue = Number(value).toFixed(2);
    } else {
      stringValue = value;
    }
  } else if (propertyConfiguration.javascriptType === "boolean") {
    stringValue = value ? "Yes" : "No";
  }

  return <TableCell>{stringValue}</TableCell>;
};

/**
 * {@link RegistryTableRow} properties
 */
interface RegistryTableRowProps {
  /**
   * Data of the row
   */
  row: any;

  /**
   * Handler for editing specific row
   * @param id id field of the row
   * @param data row data
   */
  onEdit: (id: any, data: any) => void;

  /**
   * Handler for removing specific row
   * @param id id field of the row
   */
  onRemove: (id: any) => void;
}

/**
 * Single row of the table
 * @param row data of the row
 * @param onEdit handler for editing specific row
 * @param onRemove handler for removing specific row
 */
const RegistryTableRow = ({
                            row, onEdit, onRemove,
                          }: RegistryTableRowProps) => {
  const {entityConfiguration, singularAssociationsMap, finalProperties} = useRegistryEntityContext();

  return (
    <TableRow
      sx={{"&:last-child td, &:last-child th": {border: 0}}}
    >
      {finalProperties.map((property) => (
        <PropertyCell key={property.name} propertyConfiguration={property} value={resolveValue(property, row)} subEntityMap={singularAssociationsMap}/>))}
      {(entityConfiguration.updateable || entityConfiguration.deletable) && (
        <TableCell>
          {entityConfiguration.updateable && <IconButton onClick={() => onEdit(resolveId(entityConfiguration, row), row)}><EditIcon/></IconButton>}
          {entityConfiguration.deletable && <IconButton onClick={() => onRemove(resolveId(entityConfiguration, row))}><DeleteIcon/></IconButton>}
        </TableCell>
      )}
    </TableRow>
  );
};

/**
 * {@link RegistryTable} properties
 */
interface RegistryTableProps {
  /**
   * Row data of entity
   */
  data: RegistryResponse<any>;

  /**
   * Current request used for latest data fetch
   */
  request: EntityRegistryRequest;

  /**
   * Change function for pagination fields
   * @param request new request value
   */
  onRequestChange: (request: EntityRegistryRequest) => void;

  /**
   * Handler for editing specific row
   * @param id id field of the row
   * @param data row data
   */
  onEdit: (id: any, data: any) => void;

  /**
   * Handler for removing specific row
   * @param id id field of the row
   */
  onRemove: (id: any) => void;
}

/**
 * Component which renders entity data in form of the table. Contains paging and actions for specific rows
 * @param data row data of entity
 * @param request current request used for latest data fetch
 * @param onRequestChange change function for pagination fields
 * @param onEdit handler for editing specific row
 * @param onRemove handler for removing specific row
 */
export const RegistryTable = ({
                                data, request, onRequestChange, onEdit, onRemove,
                              }: RegistryTableProps) => {
  const {entityConfiguration, finalProperties} = useRegistryEntityContext();

  const onPageChange = (event: unknown, newPage: number) => {
    onRequestChange({...request, pageNumber: newPage});
  };
  const onPageSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRequestChange({...request, pageSize: +event.target.value, pageNumber: 0});
  };

  const onSortChange = (sortPropertyList: SortProperty[]) => {
    onRequestChange({...request, sortPropertyList});
  };

  return (
    <Paper>
      <TableContainer>
        <Table sx={{minWidth: 650}} size="small">
          <TableHead>
            <TableRow>
              {finalProperties.map((property) => (
                <RegistryTableHeadCell key={property.name} property={property} sortPropertyList={request.sortPropertyList ?? []} onSortChange={onSortChange}/>
              ))}
              {(entityConfiguration.updateable || entityConfiguration.deletable) && (<TableCell/>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {(data.content ?? []).map((row, index) => <RegistryTableRow key={index} row={row} onEdit={onEdit} onRemove={onRemove}/>)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.totalElements}
        rowsPerPage={request.pageSize}
        page={request.pageNumber}
        onPageChange={onPageChange}
        onRowsPerPageChange={onPageSizeChange}
      />
    </Paper>
  );
};
