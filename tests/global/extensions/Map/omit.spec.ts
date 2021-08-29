import "reflect-metadata";
import { expect } from "chai";
import ".framework/type-extensions";

describe("global > extensions > Map > #omit()", () => {
  const people = [
    { id: 1, name: "John Snow", age: 19 },
    { id: 2, name: "Ned Stark", age: 38 },
    { id: 3, name: "Rob Stark", age: 21 },
    { id: 4, name: "Daenerys Targaryen", age: 20 },
  ].toDictionary("id");

  it("should not remove property from original map", () => {
    const peopleWithAgeOmitted = people.omit("age");

    expect(peopleWithAgeOmitted).to.not.equal(people);

    for (const person of people.values()) {
      expect(person).to.have.property("age");
    }
  });

  it("should create a new map with specified property omitted", () => {
    const peopleWithAgeOmitted = people.omit("age");

    for (const person of peopleWithAgeOmitted.values()) {
      expect(person).to.not.have.property("age");
    }
  });

  it("should be able to omit several properties", () => {
    const peopleWithIdAndAgeOmitted = people.omit("age", "id");

    for (const person of peopleWithIdAndAgeOmitted.values()) {
      expect(person).to.not.have.property("age");
      expect(person).to.not.have.property("id");
    }
  });
});
