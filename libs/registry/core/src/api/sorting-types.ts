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
 * Sort direction.
 */
export type SortDirection = "ASC" | "DESC";

/**
 * Combination of property to sort by and sort direction.
 */
export interface SortProperty {

  /**
   * Property to sort by.
   */
  property: string;

  /**
   * Sort direction.
   */
  direction: SortDirection;
}
