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
 * Parameters for pagination when fetching entities from backend.
 */
export interface PagingParameter {
  /**
   * Page number. Starts from 0.
   */
  pageNumber: number;

  /**
   * Number of entities to fetch.
   */
  pageSize: number;
}

/**
 * Response data regarding paging when fething entities from backend.
 */
export interface PagingResponse {

  /**
   * Is this page the first one.
   */
  first: boolean;

  /**
   * Is this page the last one.
   */
  last: boolean;

  /**
   * Is this page empty.
   */
  empty: boolean;

  /**
   * Number of total pages for this search.
   */
  totalPages: number;

  /**
   * Number of total elements over all pages for this search.
   */
  totalElements: number;

  /**
   * Number of elements on current page.
   */
  numberOfElements: number;
}
