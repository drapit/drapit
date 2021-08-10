import "reflect-metadata";
import { RouteDefinition } from "infrastructure/openapi/decorators";

export default interface IRoute {
  route(route: RouteDefinition): void;
}
