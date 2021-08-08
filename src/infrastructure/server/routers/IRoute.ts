import "reflect-metadata";
import { RouteDefinition } from "controllers/decorators";

export default interface IRoute {
  route(route: RouteDefinition): void;
}
