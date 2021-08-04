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
  Resource 
} from "controllers/decorators";
import HttpResponse from "infrastructure/helpers/HttpResponse";
import BaseController from "controllers/BaseController";
import Header from "controllers/decorators/parameters/Header";
import Cookie from "controllers/decorators/parameters/Cookie";

@Resource('Some description for the resource')
class HealthCheckQueryString {
  @isString()
  public testParam?: string;
  @isInt64()
  public otherTestParam?: number;
  @isDouble()
  public otherTestParam2?: number;
  @isBoolean()
  public justAnotherTestParam?: boolean;
  public constructor(params: Partial<HealthCheckQueryString> = {}) {
    this.testParam = params.testParam;
    this.otherTestParam = params.otherTestParam;
    this.justAnotherTestParam = params.justAnotherTestParam;
  }
}

@Resource()
class PathParameters {
  [key: string]: number;

  public constructor(params: {[key: string]: string} = {}) {
    Object.keys(params).forEach((key) => {
      this[key] = parseInt(params[key]);
    })
  }
}


Resource('Some description for the resource')
class HeadersParameters {
  @isString()
  public oooo?: string;
  @isString()
  public i?: string;

  public constructor(params: Partial<HeadersParameters> = {}) {
    this.oooo = params.oooo;
    this.i = params.i;
  }
}

@Controller('/health-check')
export default class HealthCheckController extends BaseController {

  @Get('/')  
  @Responds(200)
  @Responds(404)
  @Xml() @Json() // TODO: default to Json and make it configurable
  public async check(): Promise<HttpResponse> {
    return HttpResponse.ok(null, 'Everything alright!');
  }

  @Post('/test')
  @Responds(200, HealthCheckQueryString)
  @Xml() @Json() // TODO: default to Json and make it configurable
  // @Accepts()
  // @ContentType()
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
