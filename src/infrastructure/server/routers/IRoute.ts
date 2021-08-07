import "reflect-metadata";
import { RouteDefinition } from "controllers/decorators/Types";

export default interface IRoute {
  route(route: RouteDefinition): void;
}
