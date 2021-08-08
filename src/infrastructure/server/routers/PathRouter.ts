import "reflect-metadata";
import { Constructor, RouteDefinition } from "controllers/decorators";
import { Router } from "express";
import IRoute from "./IRoute";

export default abstract class PathRouter implements IRoute {
  protected path: string;
  protected router: Router;
  protected Controller: Constructor;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected instance: any;

  public constructor(Controller: Constructor, router: Router) {
    this.Controller = Controller;
    this.instance = new Controller();
    this.path = Reflect.getMetadata("prefix", Controller);
    this.router = router;
  }

  public abstract route(route: RouteDefinition): void;
}
