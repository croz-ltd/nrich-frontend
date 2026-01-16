/*
 *    Copyright 2022 CROZ d.o.o, the original author or authors.
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

import { FormConfigurationValidationZodConverter } from "../../src/zod/converter";
import {
  createArrayValidationList,
  createBooleanValidationList,
  createComplexValidationList,
  createCustomValidationList,
  createNestedValidationList,
  createObjectValidationList,
  createSimpleNullableValidationList,
  createSimpleValidationList,
  invalidValidationConfiguration,
} from "../testutil/form-configuration-generating-util";

describe("@croz/nrich-form-configuration-core/FormConfigurationValidationZodConverter", () => {
  const formConfig = (list) => ({
    formId: "test",
    constrainedPropertyConfigurationList: list,
  });

  it("should not throw exception when receiving invalid configuration", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const invalidList = invalidValidationConfiguration();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(invalidList));
    expect(schema).toBeDefined();
    expect(() => schema.parse({ username: "username" })).not.toThrow();
  });

  it("should convert simple configuration to zod schema", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const simpleList = createSimpleValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(simpleList));

    expect(schema).toBeDefined();

    expect(() => schema.parse({ username: "" })).toThrow(/cannot be blank/i);
    expect(() => schema.parse({ username: null })).toThrow(/cannot be blank/i);
    expect(() => schema.parse({ username: undefined })).toThrow(/cannot be blank/i);
    expect(() => schema.parse({ username: "username" })).not.toThrow();
  });

  it("should use custom converter", () => {
    const additional = {
      supports: () => true,
      convert: (_, schema) => schema.refine(() => false, { message: "Custom validation error" }),
    };
    const converter = new FormConfigurationValidationZodConverter([additional]);
    const simpleList = createSimpleValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(simpleList));

    expect(() => schema.parse({ username: "test" })).toThrow("Custom validation error");
  });

  it("should convert complex configuration to zod schema", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const complexList = createComplexValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(complexList));

    expect(schema).toBeDefined();

    expect(() => schema.parse({ name: "D" })).toThrow(/minimum.*3.*maximum.*10/i);
    expect(() => schema.parse({ name: "to many characters" })).toThrow(/minimum.*3.*maximum.*10/i);
    expect(() => schema.parse({ name: "1234" })).toThrow(/only letters/i);
    expect(() => schema.parse({ age: 10 })).toThrow(/minimum age is 21/i);
    expect(() => schema.parse({ age: 200 })).toThrow(/maximum age is 110/i);
    expect(() => schema.parse({ description: "" })).toThrow(/description must not be empty/i);
    expect(() => schema.parse({ description: null })).toThrow(/description must not be empty/i);

    expect(() => schema.parse({ name: "Name", age: 30, description: "Desc" })).not.toThrow();
  });

  it.each([
    [{ user: { username: "", email: "email@test.com", address: { street: "street", city: "city" } } }, "Username cannot be blank"],
    [{ user: { username: "username", email: "invalid", address: { street: "street", city: "city" } } }, "Not a valid email"],
    [{ user: { username: "username", email: "email@test.com", address: { street: "", city: "city" } } }, "Street cannot be blank"],
    [{ user: { username: "username", email: "email@test.com", address: { street: "street", city: "" } } }, "City cannot be blank"],
  ])("should validate nested data and return error %p", (data, expectedMsg) => {
    const converter = new FormConfigurationValidationZodConverter();
    const nestedList = createNestedValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(nestedList));

    expect(() => schema.parse(data)).toThrow(new RegExp(expectedMsg, "i"));
  });

  it("should support custom constraints", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const customList = createCustomValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(customList));

    expect(() => schema.parse({ title: "other" })).toThrow(/not in list/i);
    expect(() => schema.parse({ title: "mr" })).not.toThrow();
  });

  it("should allow null if backend didn't define NotNull/NotBlank/NotEmpty", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const nullableList = createSimpleNullableValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(nullableList));

    expect(() => schema.parse({ username: null })).not.toThrow();
  });

  it("should convert boolean type to zod boolean schema", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const booleanList = createBooleanValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(booleanList));

    expect(schema).toBeDefined();

    expect(() => schema.parse({ active: true })).not.toThrow();
    expect(() => schema.parse({ active: false })).not.toThrow();
    expect(() => schema.parse({ active: "not boolean" })).toThrow();
    expect(() => schema.parse({ active: null })).toThrow(/active must not be null/i);
  });

  it("should convert array type to zod array schema", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const arrayList = createArrayValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(arrayList));

    expect(schema).toBeDefined();

    expect(() => schema.parse({ items: ["a", "b"] })).not.toThrow();
    expect(() => schema.parse({ items: [1, 2, 3] })).not.toThrow();
    expect(() => schema.parse({ items: null })).toThrow(/items must not be empty/i);
    expect(() => schema.parse({ items: [] })).toThrow(/items must not be empty/i);
    expect(() => schema.parse({ items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] })).toThrow(/items must have between 1 and 10 elements/i);
  });

  it("should validate nested object with NotNull constraint", () => {
    const converter = new FormConfigurationValidationZodConverter();
    const objectList = createObjectValidationList();

    const schema = converter.convertFormConfigurationToZodSchema(formConfig(objectList));

    expect(schema).toBeDefined();

    expect(() => schema.parse({ user: { address: { street: "Main" } } })).not.toThrow();
    expect(() => schema.parse({ user: { address: null } })).toThrow(/address must not be null/i);
  });
});
