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

/**
 * Represents client property configuration that can be used when building form and grids on client side.
 */
export interface RegistryPropertyConfiguration {
  /**
   * Property name.
   */
  name: string;

  /**
   * Property Javascript type (converted from property type).
   */
  javascriptType: string;

  /**
   * Property original type class name
   */
  originalType: string;

  /**
   * Whether this property is id.
   */
  id: boolean;

  /**
   * Whether this property is decimal (Javascript has no specific decimal type).
   */
  decimal: boolean;

  /**
   * Whether this property represents a singular association (JPA @OneToOne or @ManyToOne)
   */
  singularAssociation: boolean;

  /**
   * Singular association class
   */
  singularAssociationReferencedClass?: string;

  /**
   * Label for this property in form view.
   */
  formLabel: string;

  /**
   * Header for this property in table view.
   */
  columnHeader: string;

  /**
   * Whether this property is editable.
   */
  editable: boolean;

  /**
   * Whether this property is sortable.
   */
  sortable: boolean;

  /**
   * Whether this property is searchable.
   */
  searchable: boolean;
}

/**
 * Represents client entity configuration that can be used when building form and grids on client side.
 */
export interface RegistryEntityConfiguration {
  /**
   * Fully qualified classname of this registry entity.
   */
  classFullName: string;

  /**
   * Simple class name.
   */
  name: string;

  /**
   * Name to be displayed.
   */
  displayName: string;

  /**
   * Group to which this registry belongs to.
   */
  groupId: string;

  /**
   * Whether this entity is read only.
   */
  readOnly: boolean;

  /**
   * Whether new instances of this entity can be created.
   */
  creatable: boolean;

  /**
   * Whether this entity can be updated.
   */
  updateable: boolean;

  /**
   * Whether this entity can be deleted.
   */
  deletable: boolean;

  /**
   * Whether this entity has identifier assigned.
   */
  identifierAssigned: boolean;

  /**
   * Whether this entity has IdClass identifier.
   */
  idClassIdentity: boolean;

  /**
   * Whether this entity has EmbeddedId identifier.
   */
  embeddedIdentity: boolean;

  /**
   * List of property names from which the id consists of.
   */
  idClassPropertyNameList: string[];

  /**
   * Whether history for this entity is available.
   */
  historyAvailable: boolean;

  /**
   * List of property configurations.
   */
  propertyConfigurationList: RegistryPropertyConfiguration[];

  /**
   * List of embedded id property configurations.
   */
  embeddedIdPropertyConfigurationList: RegistryPropertyConfiguration[];

  /**
   * List of history properties, only available if history exists.
   */
  historyPropertyConfigurationList: RegistryPropertyConfiguration[];
}

/**
 * Configuration for registry group (a group of registry entities).
 */
export interface RegistryGroupConfiguration {
  /**
   * Unique id of group.
   */
  groupId: string;

  /**
   * Display label for group.
   */
  groupIdDisplayName: string;

  /**
   * List of entity configurations belonging to this group.
   */
  entityConfigurationList: RegistryEntityConfiguration[];
}
