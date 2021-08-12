import "reflect-metadata";
import { expect } from "chai";
import {
  PropertyDefinition,
  Required,
} from "infrastructure/openapi/decorators";

describe("github issues > #14 Add @Required() decorator to document that a parameter is required.", () => {
  class Target {
    @Required()
    public requiredProperty: unknown;

    public optionalProperty: unknown;
  }

  it("should have captured metadata of the required property only", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Target
    );

    expect(properties).to.have.lengthOf(1);
    expect(properties.find((p) => p.name == "requiredProperty")).to.not.be.null;
  });

  it("should have set marked 'requiredProperty' as required", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Target
    );

    const property = properties.find((p) => p.name == "requiredProperty");

    expect(property?.required).to.be.true;
  });
});
