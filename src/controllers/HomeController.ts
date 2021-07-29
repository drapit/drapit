import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "./BaseController";

export default class HomeController extends BaseController {
  public async index(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }
}
