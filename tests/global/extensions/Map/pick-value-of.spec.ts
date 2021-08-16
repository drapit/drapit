import "reflect-metadata";
import { expect } from "chai";
import "global/extensions";

describe("global > extensions > Map > #pickValueOf()", () => {
  const people = [
    { id: 1, name: "John Snow", age: 19 },
    { id: 2, name: "Ned Stark", age: 38 },
    { id: 3, name: "Rob Stark", age: 21 },
    { id: 4, name: "Daenerys Targaryen", age: 20 },
  ].toDictionary("id");

  it("should not remove properties from original map", () => {
    const peopleWithAgeValue = people.pickValueOf("age");

    expect(peopleWithAgeValue).to.not.equal(people);

    for (const person of people.values()) {
      expect(person).to.have.property("id");
      expect(person).to.have.property("name");
    }
  });

  it("should create a new map with only specified property's value", () => {
    const peopleWithAgeValue = people.pickValueOf("age");

    for (const id of peopleWithAgeValue.keys()) {
      expect(peopleWithAgeValue.get(id)).to.not.be.undefined;
      expect(peopleWithAgeValue.get(id)).to.equal(people.get(id)?.age);
    }
  });
});
