import { Controller, Get } from "decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";

@Controller('/health-check')
export default class HealthCheckController extends BaseController {

  @Get('/')
  public async check(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }
}
