import "reflect-metadata";
import { expect } from "chai";
import ".framework/type-extensions";

describe("global > extensions > Map > #pick()", () => {
  const people = [
    { id: 1, name: "John Snow", age: 19 },
    { id: 2, name: "Ned Stark", age: 38 },
    { id: 3, name: "Rob Stark", age: 21 },
    { id: 4, name: "Daenerys Targaryen", age: 20 },
  ].toDictionary("id");

  it("should not remove properties from original map", () => {
    const peopleWithOnlyAge = people.pick("age");

    expect(peopleWithOnlyAge).to.not.equal(people);

    for (const person of people.values()) {
      expect(person).to.have.property("id");
      expect(person).to.have.property("name");
    }
  });

  it("should create a new map with only specified property", () => {
    const peopleWithOnlyAge = people.pick("age");

    for (const person of peopleWithOnlyAge.values()) {
      expect(person).to.have.property("age");
      expect(person).to.not.have.property("id");
      expect(person).to.not.have.property("name");
    }
  });

  it("should be able to pick several properties", () => {
    const peopleWithOnlyIdAndAge = people.pick("age", "id");

    for (const person of peopleWithOnlyIdAndAge.values()) {
      expect(person).to.have.property("age");
      expect(person).to.have.property("id");
      expect(person).to.not.have.property("name");
    }
  });
});
