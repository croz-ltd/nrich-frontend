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
  FormType, RegistryEntityConfiguration, RegistryPropertyConfiguration, SearchParameter,
} from "../api";
import { RegistryResponse } from "../service";
import { restructureSubmitValue } from "../util";
import { DEFAULT_INITIAL_REQUEST, EntityRegistryRequest, useRegistryEntity } from "./use-registry-entity";
import { useUpdateEffect } from "./use-update-effect";

/**
 * Return value of {@link useRegistryEntityAdministration} hook. Contains all configuration, data and handlers for most of the administration operations.
 */
interface UseRegistryEntityAdministration {
  /**
   * Configuration of wanted entity
   */
  entityConfiguration: RegistryEntityConfiguration;

  /**
   * Id property of the entity
   */
  entityIdProperty: RegistryPropertyConfiguration;

  /**
   * Currently fetched data for this entity.
   */
  data: RegistryResponse<any[]>;

  /**
   * Currently used request for fetching.
   */
  request: EntityRegistryRequest;

  /**
   * Handler when paging (page number or size) is changed. Refeteches data with new paging configuration.
   * Reuses filter configuration if any is used.
   * @param newPagingRequest new paging configuration for fetching. Non paging fields are ignored.
   */
  handlePagingUpdate: (newPagingRequest: EntityRegistryRequest) => Promise<void>;

  /**
   * Handler when filter (query and search fields) is changed. Refeteches with new filter configuration.
   * Reuses page size and resets page to 0.
   */
  handleFilterUpdate: (searchParameter: SearchParameter) => Promise<void>;

  /**
   * Handler for adding new entry. Opens up modal for form to be filled.
   */
  handleAddClick: () => void;

  /**
   * Handler for editing existing entry. Opens up modal with filled data to be edited.
   * @param id id of the entry to be edited
   * @param row data of the entry to be edited
   */
  handleEditClick: (id: any, row: any) => void;

  /**
   * Handler for submitting add or edit form. Closes modal and tries to save new data.
   * @param values data of new/edited entry for saving
   */
  handleSubmitClick: (values: any) => Promise<void>;

  /**
   * Current form type (create or update). Undefined if no form is currently active.
   */
  formType?: FormType;

  /**
   * Initial data when opening form. Empty object for adding, and row data for editing.
   */
  formData: any;

  /**
   * Flag which marks if form modal is open or not.
   */
  formModalOpen: boolean;

  /**
   * Method for explicit closing of form modal.
   */
  closeFormModal: () => void;

  /**
   * Flag if data is currently loading.
   */
  loading: boolean;

  /**
   * Deletes existing entity.
   * Automatically re-fetches with request provided to hook.
   * @param id id of the data for editing. When complex ids are used, it should be an object containing all id fields.
   */
  remove: (id: any) => Promise<void>;
}

/**
 * Helper hook which handles most of the administration for registry entity. For given entity name you get all the data handling out of the box.
 * This hook assumes that modal is used for forms, but usage can be what fits the case.
 * @param entityName name of the entity for administration
 */
export const useRegistryEntityAdministration = (entityName: string): UseRegistryEntityAdministration => {
  const [request, setRequest] = React.useState<EntityRegistryRequest>(DEFAULT_INITIAL_REQUEST);
  const registryEntity = useRegistryEntity(entityName, request);
  const [formModalOpen, setFormModalOpen] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<FormType | undefined>(undefined);
  const [formData, setFormData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    entityConfiguration, entityIdProperty, data, add, edit, remove,
  } = registryEntity;

  const handlePagingUpdate = async (newPagingRequest: EntityRegistryRequest) => {
    setRequest((oldRequest) => ({ ...oldRequest, ...newPagingRequest }));
  };

  const handleFilterUpdate = async (searchParameter: SearchParameter) => {
    setRequest((oldRequest) => ({ ...oldRequest, pageNumber: 0, searchParameter }));
  };

  useUpdateEffect(() => {
    const reload = async () => {
      setLoading(true);
      await registryEntity.load(request);
      setLoading(false);
    };
    reload();
  }, [request]);

  const handleAddClick = () => {
    setFormModalOpen(true);
    setFormType("create");
    setFormData(undefined);
  };

  const handleEditClick = (id: any, row: any) => {
    setFormModalOpen(true);
    setFormType("update");
    setFormData(row);
  };

  const handleSubmitClick = async (values: any) => {
    const finalValue = restructureSubmitValue(values);
    setFormModalOpen(false);
    setLoading(true);
    if (formType === "update") {
      await edit(formData[entityIdProperty.name], finalValue);
    }
    else {
      await add(finalValue);
    }
    setLoading(false);
    setFormType(undefined);
    setFormData({});
  };

  const closeFormModal = () => setFormModalOpen(false);

  return {
    entityConfiguration,
    entityIdProperty,
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
  };
};
