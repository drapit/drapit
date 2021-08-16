import "reflect-metadata";
import "global/extensions";

import { expect } from "chai";
import { RouteDefinition } from "infrastructure/openapi/decorators";
import MIMETypes from "application/enums/MIMETypes";
import Controller from "./Controller";
import Resource from "./Resource";

describe("github issues > #18 Modify @Responds() decorator to document the content type of the response.", () => {
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

    expect(response?.contentTypes)
      .to.be.an("array")
      .that.includes(MIMETypes.pdf);
  });

  it("should document response DTO and content type", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "justAnotherAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.contentTypes)
      .to.be.an("array")
      .that.includes(MIMETypes.xml);
    expect(response?.ResponseType?.name).to.equals(Resource.name);
  });

  it("should document response content type should default to application/json and application/xml", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "someAction");
    const response = route?.responses?.find((r) => r.status === 200);

    expect(response?.contentTypes)
      .to.be.an("array")
      .that.includes(MIMETypes.xml);
    expect(response?.contentTypes)
      .to.be.an("array")
      .that.includes(MIMETypes.json);
  });

  it("should document several responses", () => {
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", Controller);
    const route = routes.find((p) => p.name === "someOtherAction");

    expect(route?.responses).to.have.lengthOf(2);
  });
});
