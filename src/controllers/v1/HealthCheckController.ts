import "reflect-metadata";
import { Body, Controller, Get, PathParameter, QueryString } from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";

class HealthCheckQueryString {
  public testParam?: string;
  public otherTestParam?: number;
  public justAnotherTestParam?: boolean;

  public constructor(params: Partial<HealthCheckQueryString>) {
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

  public constructor(params: {[key: string]: string}) {
    Object.keys(params).forEach((key) => {
      this[key] = parseInt(params[key]);
    })
  }
}
@Controller('/health-check')
export default class HealthCheckController extends BaseController {

  @Get('/')
  public async check(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }

  @Get('/test/')
  public async test(
    @PathParameter(PathParameters) pathParams: PathParameters,
    @Body(HealthCheckQueryString) body: HealthCheckQueryString,
    @QueryString(HealthCheckQueryString) quey: HealthCheckQueryString,
  ): Promise<HttpResponse<HealthCheckQueryString>> {
    Logger.debug(body,quey, pathParams);

    return HttpResponse.ok(body, 'Everything alright!');
  }
}
