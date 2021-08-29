import "reflect-metadata";
import { expect } from "chai";
import { PropertyDefinition } from ".framework/api/definitions";
import { Enum } from ".framework/api/decorators";

describe("github issues > #12 Add @Enum() decorator to document the array of accepted values for a specific parameter.", () => {
  enum DummyEnum {
    a,
    b,
    c,
  }

  enum DummyNumericEnum {
    firstValue = 125,
    secondValue = 200,
    thirdValue = 400,
  }

  enum DummyStringEnum {
    firstValue = "value one",
    secondValue = "value two",
    thirdValue = "value tree",
  }

  class Resource {
    @Enum(DummyEnum)
    public someProp?: DummyEnum;

    @Enum(DummyNumericEnum)
    public someNumericProp?: DummyNumericEnum;

    @Enum(DummyStringEnum)
    public otherStringProp?: DummyStringEnum;
  }

  it("should document numeric values for a parameter by default", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Resource
    );

    expect(properties).to.have.lengthOf(3);

    const property = properties.find((p) => p.name == "someProp");

    expect(property).to.not.be.undefined;
    expect(property?.enum)
      .to.be.an("array")
      .with.lengthOf(3)
      .that.contains(0)
      .and.contains(1)
      .and.contains(2);
  });

  it("should document explicit numeric values for a parameter", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Resource
    );

    expect(properties).to.have.lengthOf(3);

    const property = properties.find((p) => p.name == "someNumericProp");

    expect(property).to.not.be.undefined;
    expect(property?.enum)
      .to.be.an("array")
      .that.contains(125)
      .and.contains(200)
      .and.contains(400);
  });

  it("should document explicit string values for a parameter", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Resource
    );

    expect(properties).to.have.lengthOf(3);

    const property = properties.find((p) => p.name == "otherStringProp");

    expect(property).to.not.be.undefined;
    expect(property?.enum)
      .to.be.an("array")
      .that.contains("value one")
      .and.contains("value two")
      .and.contains("value tree");
  });
});
