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
} from "@drapit/api/decorators";
import BaseController from "api/BaseController";
import Health from "../dtos/resources/Health";

@Tag("built-in")
@Controller("/health-check")
export default class HealthCheckController extends BaseController {
  @Post("/:id")
  @Ok(Health, "Everything alright!")
  @NotFound()
  @Description("Endpoint to check API health")
  @Allow(Roles.Admin)
  public async check(
    @Body(Health) body: Health,
    @Query("hey") hey: string,
    @Query("name") name: string,
    @Path("id") id: number,
    @Cookie("bom", Number) bom: number,
    @Header("pop", Boolean) pop: string
  ): Promise<Health> {
    return new Health({
      uptime: process.uptime(),
      timestamp: Date.now(),
    });
  }
}
