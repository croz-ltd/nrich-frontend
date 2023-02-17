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
  Backdrop, Box, Button, CircularProgress, Modal, Paper,
} from "@mui/material";

import { RegistryEntityContextProvider, useRegistryEntityAdministration } from "@croz/nrich-registry-core";

import { RegistryFilter } from "./RegistryFilter";
import { RegistryForm } from "./RegistryForm";
import { RegistryTable } from "./RegistryTable";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 12,
};

/**
 * {@link RegistryEntity} properties
 */
export interface Props {
  /**
   * Name of the registry entity
   */
  entityName: string;
}

/**
 * Component that manages full administration for single registry entity. Includes table with paging and filtering, adding, editing
 * and deleting entities.
 * @param entityName Name of administered registry entity
 */
export const RegistryEntity = ({ entityName }: Props) => {
  const {
    entityConfiguration,
    data,
    request,
    handlePagingUpdate,
    handleFilterUpdate,
    handleAddClick,
    handleEditClick,
    handleSubmitClick,
    formType,
    formData,
    formModalOpen,
    closeFormModal,
    loading,
    remove,
  } = useRegistryEntityAdministration(entityName);

  return (
    <RegistryEntityContextProvider entityConfiguration={entityConfiguration}>
      <Paper sx={{
        display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
      }}
      >
        <RegistryFilter onFilterUpdate={handleFilterUpdate} />
        <div>
          {entityConfiguration.creatable && <Button variant="contained" onClick={handleAddClick}>Add</Button>}
        </div>
      </Paper>
      <RegistryTable data={data} request={request} onRequestChange={handlePagingUpdate} onEdit={handleEditClick} onRemove={remove} />
      {
        formModalOpen && (
          <Modal open={formModalOpen} onClose={(_, reason) => reason !== "backdropClick" && closeFormModal()}>
            <Box sx={modalStyle}>
              <RegistryForm
                type={formType}
                initialValues={formData}
                onClose={closeFormModal}
                onSubmit={handleSubmitClick}
              />
            </Box>
          </Modal>
        )
      }
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </RegistryEntityContextProvider>
  );
};
