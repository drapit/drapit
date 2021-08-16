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

    @Required()
    public otherRequiredProperty: unknown;

    public optionalProperty: unknown;
  }

  it("should capture metadata of the required properties only", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Target
    );

    expect(properties).to.have.lengthOf(2);
    expect(properties.find((p) => p.name == "requiredProperty")).to.not.be.undefined;
    expect(properties.find((p) => p.name == "otherRequiredProperty")).to.not.be.undefined;
    expect(properties.find((p) => p.name == "optionalProperty")).to.be.undefined;
  });

  it("should mark required property as required", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Target
    );

    const property = properties.find((p) => p.name == "requiredProperty");

    expect(property?.required).to.be.true;
  });
});
