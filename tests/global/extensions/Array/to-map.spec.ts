import "reflect-metadata";
import { expect } from "chai";
import "global/extensions";

describe("global > extensions > Array > #toMap()", () => {
  const people = [
    { id: 1, name: "John Snow", age: 19 },
    { id: 2, name: "Ned Stark", age: 38 },
    { id: 3, name: "Rob Stark", age: 21 },
    { id: 4, name: "Daenerys Targaryen", age: 20 },
  ];

  it("should convert an array of objects to a map", () => {
    const map = people.toDictionary("id");

    expect(map).to.be.instanceOf(Map)
  });

  it("should use given property as key", () => {
    const mapById = people.toDictionary("id");
    const mapByName = people.toDictionary("name");

    for (const id of mapById.keys()) {
      expect(typeof id).to.equal("number");
    }

    for (const name of mapByName.keys()) {
      expect(typeof name).to.equal("string");
    }
  });

  it("should have the same content as the array", () => {
    const mapById = people.toDictionary("id");

    expect([...mapById]).to.have.lengthOf(people.length);

    for (const id of mapById.keys()) {
      const person = people.find(p => p.id === id);

      expect(person).to.not.be.undefined;
      expect(mapById.get(id)).to.equal(person);
    }
  });
});
