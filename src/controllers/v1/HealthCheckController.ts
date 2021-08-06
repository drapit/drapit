import "reflect-metadata";
import {
  Body,
  Controller,
  isDouble,
  Get,
  isInt64,
  Path,
  Post,
  QueryString,
  isString,
  isBoolean,
  Json,
  Responds,
  Xml,
  Resource,
  Description,
  Example,
} from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";
import Header from "controllers/decorators/parameters/Header";
import Cookie from "controllers/decorators/parameters/Cookie";

class DTO<T> {
  [key: string]: unknown;

  public constructor(params: Partial<T> = {}) {
    Object.keys(params).forEach((property: keyof DTO<T>) => {
      (this as DTO<T>)[property] = (params as DTO<T>)[property];
    });
  }
}

@Resource("Some description for the resource")
class HealthCheckQueryString extends DTO<HealthCheckQueryString> {
  @isString()
  @Description("This is an explanation!")
  @Example("some testing value")
  public testParam?: string;

  @isInt64()
  @Example(1)
  public otherTestParam?: number;

  @isDouble()
  @Example(1.34)
  public otherTestParam2?: number;

  @isBoolean()
  @Example(false)
  public justAnotherTestParam?: boolean;
}

@Resource()
class PathParameters extends DTO<PathParameters> {
  [key: string]: number;
}

@Resource("Some description for the resource")
class HeadersParameters extends DTO<HeadersParameters> {
  @isString()
  public oooo?: string;

  @isString()
  public i?: string;
}

@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Get("/")
  @Responds(200)
  @Responds(404)
  @Xml()
  @Json() // TODO: default to Json and make it configurable
  @Description("This the right explanation!")
  public async check(): Promise<HttpResponse> {
    return HttpResponse.ok(null, "Everything alright!");
  }

  @Post("/test")
  @Responds(200, HealthCheckQueryString)
  @Xml()
  @Json() // TODO: default to Json and make it configurable
  // @Accepts()
  // @ContentType()
  public async test(
    @Header(HeadersParameters) header: HeadersParameters,
    @Path(PathParameters) pathParams: PathParameters,
    @Body(HealthCheckQueryString) body: HealthCheckQueryString,
    @QueryString(HealthCheckQueryString) quey: HealthCheckQueryString,
    @Cookie(HeadersParameters) cookies: HeadersParameters
  ): Promise<HttpResponse<HealthCheckQueryString>> {
    return HttpResponse.ok(body, "Everything alright!");
  }
}
