import "reflect-metadata";
import { expect } from "chai";
import {
  Obsolete,
  PropertyDefinition,
  RouteDefinition,
} from "infrastructure/openapi/decorators";

describe("github issues > #29 Add @Obsolete() decorator to document that a property or endpoint is deprecated.", () => {
  class Resource {
    @Obsolete()
    public obsoleteProperty: unknown;

    public justAProperty: unknown;
  }

  class Controller {
    @Obsolete()
    public someAction(): void {
      // do stuff
    }
  }

  it("should mark property as obsolete", () => {
    const properties: PropertyDefinition[] = Reflect.getMetadata(
      "properties",
      Resource
    );

    const property = properties.find((p) => p.name === "obsoleteProperty");
    expect(property).to.not.be.undefined;
    expect(property?.deprecated).to.be.true;
  });

  it("should mark action as obsolete", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);

    const property = routes.find((p) => p.name === "someAction");
    expect(property).to.not.be.undefined;
    expect(property?.deprecated).to.be.true;
  });
});
