import "reflect-metadata";
import { expect } from "chai";
import ".framework/type-extensions";

describe("global > extensions > Map > #toJson()", () => {
  const people = [
    { id: 1, name: "John Snow", age: 19 },
    { id: 2, name: "Ned Stark", age: 38 },
    { id: 3, name: "Rob Stark", age: 21 },
    { id: 4, name: "Daenerys Targaryen", age: 20 },
  ].toDictionary("id");

  it("should convert the map to a json with the same key/value associations", () => {
    const peopleAsJSON = people.toJSON();

    for (const key of people.keys()) {
      expect(peopleAsJSON[key as string]).to.equal(people.get(key));
    }
  });
});
