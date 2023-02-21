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

import {
  findIdField, formatIdName, resolveId, resolveValue, restructureSubmitValue,
} from "../../src";
import {
  registryConfigurationMock, registryConfigurationWithClassIdMock, registryEmbeddedIdListMock, registryListMock,
} from "../testutil/registry-mock";

describe("@croz/nrich-registry-core/registry-entity-utils/resolveId", () => {
  it("should return correct id for simple configuration", () => {
    // given
    const entityConfiguration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");
    const data = registryListMock.content[0];

    // when
    const id = resolveId(entityConfiguration, data);

    // then
    expect(id).toEqual(registryListMock.content[0].id);
  });

  it("should return correct id for configuration with embedded id", () => {
    // given
    const entityConfiguration = registryConfigurationMock
      .find((group) => group.groupId === "Book").entityConfigurationList
      .find((entity) => entity.name === "AuthorBook");
    const data = registryEmbeddedIdListMock;

    // when
    const id = resolveId(entityConfiguration, data);

    // then
    expect(id).toEqual(data.id);
  });

  it("should return correct id for configuration with id class", () => {
    // given
    const entityConfiguration = registryConfigurationWithClassIdMock;

    const data = {
      author: {
        id: 1,
        firstName: "First_0",
        lastName: "Last_0",
      },
      book: {
        id: 1,
        title: "Title: 0",
      },
      edition: "Edition: 0",
    };

    // when
    const id = resolveId(entityConfiguration, data);

    // then
    expect(id).toEqual({ author: data.author, book: data.book });
  });
});

describe("@croz/nrich-registry-core/registry-entity-utils/resolveValue", () => {
  it("should return correct value for non-nested property", () => {
    // given
    const propertyConfiguration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address").propertyConfigurationList
      .find((property) => property.name === "city");
    const data = registryListMock.content[0];

    // when
    const value = resolveValue(propertyConfiguration, data);

    // then
    expect(value).toEqual(data.city);
  });

  it("should return correct value for single-nested property", () => {
    // given
    const propertyConfiguration = registryConfigurationMock
      .find((group) => group.groupId === "Book").entityConfigurationList
      .find((entity) => entity.name === "AuthorBook").embeddedIdPropertyConfigurationList
      .find((property) => property.name === "id.author");
    const data = registryEmbeddedIdListMock;

    // when
    const value = resolveValue(propertyConfiguration, data);

    // then
    expect(value).toEqual(data.id.author);
  });

  it("should return correct value for deeply-nested property", () => {
    // given
    const propertyConfiguration = { name: "id.author.firstName" };
    const data = registryEmbeddedIdListMock;

    // when
    const value = resolveValue(propertyConfiguration, data);

    // then
    expect(value).toEqual(data.id.author.firstName);
  });
});

describe("@croz/nrich-registry-core/registry-entity-utils/restructureSubmitValue", () => {
  it("should convert flat structure to nested one", () => {
    // given
    const input = { "id.author": { id: 1 }, "id.book": { id: 3 }, edition: "First edition" };

    // when
    const output = restructureSubmitValue(input);

    // then
    expect(output).toEqual({ id: { author: { id: 1 }, book: { id: 3 } }, edition: "First edition" });
  });
});

describe("@croz/nrich-registry-core/registry-entity-utils/formatIdName", () => {
  it("should return readable id value", () => {
    // given
    const classFullName = "net.croz.nrichdemobackend.registry.model.Author";
    const idFieldName = "id";
    const id = 1;

    // when
    const formattedValue = formatIdName(classFullName, idFieldName, id);

    // then
    expect(formattedValue).toEqual("Author[id=1]");
  });
});

describe("@croz/nrich-registry-core/registry-entity-utils/findIdField", () => {
  it("should return id field for simple configuration", () => {
    // given
    const entityConfiguration = registryConfigurationMock
      .find((group) => group.groupId === "Address").entityConfigurationList
      .find((entity) => entity.name === "Address");

    // when
    const idField = findIdField(entityConfiguration);

    // then
    expect(idField.name).toEqual("id");
    expect(idField.javascriptType).toEqual("number");
  });
});
