import "reflect-metadata";
import {
  Controller,
  Get,
  Json,
  Responds,
  Xml,
  Description,
  Tag,
} from "infrastructure/openapi/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "api/BaseController";
import Health from "../dtos/resources/Health";

@Tag("build-in")
@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Get("/")
  @Responds(200, Health)
  @Xml()
  @Json() // TODO: default to Json and make it configurable
  @Description("Endpoint to check API health")
  public async check(): Promise<HttpResponse<Health>> {
    const healthCheck = new Health({
      uptime: process.uptime(),
      timestamp: Date.now(),
    });

    return HttpResponse.ok(healthCheck, "Everything alright!");
  }
}
