import "reflect-metadata";
import { Body, Controller, Delete, Get, Path, Post, QueryString } from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";
import Header from "controllers/decorators/parameters/Header";
import Cookie from "controllers/decorators/parameters/Cookie";
import { ParametersDefinition, RouteDefinition } from "controllers/decorators/RouteDefinition";
import { Json, Responds, Xml } from "controllers/decorators/responses";

class HealthCheckQueryString {
  public testParam?: string;
  public otherTestParam?: number;
  public justAnotherTestParam?: boolean;
  public constructor(params: Partial<HealthCheckQueryString> = {}) {
    this.testParam = params.testParam;
    this.otherTestParam = params.otherTestParam;
    this.justAnotherTestParam = params.justAnotherTestParam;
  }

  public unMeth() {
    return 'aaaaaaaaaaaa';
  }
}

class PathParameters {
  [key: string]: number;

  public constructor(params: {[key: string]: string} = {}) {
    Object.keys(params).forEach((key) => {
      this[key] = parseInt(params[key]);
    })
  }
}

class HeadersParameters {
  public oooo?: string;
  public i?: string;

  public constructor(params: Partial<HeadersParameters> = {}) {
    this.oooo = params.oooo;
    this.i = params.i;
  }
}

@Controller('/health-check')
export default class HealthCheckController extends BaseController {

  @Get('/')  
  @Responds(200, null, "Successful response")
  @Responds(404, null, "Results not found")
  @Xml() @Json() // TODO: default to Json and make it configurable
  public async check(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }

  @Post('/test')
  @Responds(200, HealthCheckQueryString)
  @Xml() @Json() // TODO: default to Json and make it configurable
  public async test(
    @Header(HeadersParameters) header: HeadersParameters,
    @Path(PathParameters) pathParams: PathParameters,
    @Body(HealthCheckQueryString) body: HealthCheckQueryString,
    @QueryString(HealthCheckQueryString) quey: HealthCheckQueryString,
    @Cookie(HeadersParameters) cookies: HeadersParameters,
  ): Promise<HttpResponse<HealthCheckQueryString>> {
    Logger.debug(body, quey, pathParams, header, cookies);

    return HttpResponse.ok(body, 'Everything alright!');
  }
}
