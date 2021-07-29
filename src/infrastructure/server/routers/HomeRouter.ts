import { Router } from "express";
import HomeController from "controllers/HomeController";
import APIRouter from "./Router";

export default class HomeRouter extends APIRouter {
  public constructor(app: Router) {
    super('/home', app);
  }

  public route(): void {
    // TODO: Construct controller in factory.
    const controller = new HomeController();
    this.get('/', controller.index);
  }
}
