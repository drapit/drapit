import "reflect-metadata";
import { expect } from "chai";
import { Responds, RouteDefinition } from "infrastructure/openapi/decorators";
import MIMETypes from "application/enums/MIMETypes";

describe("github issues > #18 Modify @Responds() decorator to document the content type of the response.", () => {
  class Resource {
    public obsoleteProperty: unknown;

    public justAProperty: unknown;
  }

  class Controller {
    @Responds(200)
    public someAction(): void {
      // do stuff
    }

    @Responds(202)
    @Responds(404)
    public someOtherAction(): void {
      // do stuff
    }

    @Responds(200, Resource)
    public justSomeOtherAction(): void {
      // do stuff
    }

    @Responds(200, MIMETypes.pdf)
    public anotherAction(): void {
      // do stuff
    }

    @Responds(200, Resource, MIMETypes.xml)
    public justAnotherAction(): void {
      // do stuff
    }
  }

  it("should document response status", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "someAction");

    expect(route?.responses).to.have.lengthOf(1);
    expect(route?.responses?.find((r) => r.status === 200)).to.not.be.undefined;
  });

  it("should document response DTO", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "justSomeOtherAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.ResponseType?.name).to.equals(Resource.name);
  });

  it("should document response content type", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "anotherAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.contentTypes).to.be.an('array').that.includes(MIMETypes.pdf);
  });

  it("should document response DTO and content type", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "justAnotherAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.contentTypes).to.be.an('array').that.includes(MIMETypes.xml);
    expect(response?.ResponseType?.name).to.equals(Resource.name);
  });

  it("should document response content type should default to application/json and application/xml", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "someAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.contentTypes).to.be.an('array').that.includes(MIMETypes.xml);
    expect(response?.contentTypes).to.be.an('array').that.includes(MIMETypes.json);
  });

  it("should document several responses", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "someOtherAction");

    expect(route?.responses).to.have.lengthOf(2);
  });
});
