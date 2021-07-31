import { Controller, Get } from "decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";

@Controller('/home')
export default class HomeController extends BaseController {

  @Get('/')
  public async index(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }
}
