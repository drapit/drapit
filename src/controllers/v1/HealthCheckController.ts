import "reflect-metadata";
import {
  Controller,
  Get,
  Json,
  Responds,
  Xml,
  Description,
  Resource,
  IsString,
  Example,
  IsInt64,
  IsDouble,
  IsBoolean,
  QueryString,
  Post,
} from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";
import DTO from "./dtos/DTO";
import { query } from "express";

@Resource("Some description for the resource")
class HealthCheckQueryString extends DTO<HealthCheckQueryString> {
  @IsString()
  @Description("This is an explanation!")
  @Example("some testing value")
  public testParam?: string;

  @IsInt64()
  @Example(1)
  public otherTestParam?: number;

  @IsDouble()
  @Example(1.34)
  public otherTestParam2?: number;

  @IsBoolean()
  @Example(false)
  public justAnotherTestParam?: boolean;
}
@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Get("/")
  @Responds(200, HealthCheckQueryString)
  @Responds(404)
  @Xml()
  @Json() // TODO: default to Json and make it configurable
  @Description("This the right explanation!")
  public async check(
    @QueryString(HealthCheckQueryString) query: HealthCheckQueryString
  ): Promise<HttpResponse<HealthCheckQueryString>> {
    return HttpResponse.ok(query, "Everything alright!");
  }
}
