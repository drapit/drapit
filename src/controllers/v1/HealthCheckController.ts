import "reflect-metadata";
import {
  Controller,
  Get,
  Json,
  Responds,
  Xml,
  Description,
} from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";

@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Get("/")
  @Responds(200)
  @Xml()
  @Json() // TODO: default to Json and make it configurable
  @Description("This the right explanation!")
  public async check( ): Promise<HttpResponse> {
    return HttpResponse.ok(null, "Everything alright!");
  }
}
