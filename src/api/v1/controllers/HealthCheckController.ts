import "reflect-metadata";
import {
  Controller,
  Responds,
  Description,
  Tag,
  Body,
  Query,
  Path,
  Cookie,
  Header,
  Post,
} from ".framework/api/decorators";
import { HttpResponse } from ".framework/api/dto";
import BaseController from "api/BaseController";
import Health from "../dtos/resources/Health";

@Tag("built-in")
@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Post("/:id")
  @Responds(200, Health)
  @Description("Endpoint to check API health")
  public async check(
    // @Body(Health)
    // body: Health,
    @Query("nalga")
    nalga: string,
    @Query("name")
    name: string,
    @Path("id")
    id: number,
    @Cookie("bom", Number) bom: number,
    @Header("pop", Boolean) pop: string
  ): Promise<HttpResponse<Health>> {
    console.log("====================", nalga, name, id, bom, pop);
    const healthCheck = new Health({
      uptime: process.uptime(),
      timestamp: Date.now(),
    });

    return HttpResponse.ok(healthCheck, "Everything alright!");
  }
}
