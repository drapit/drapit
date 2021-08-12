import {
  Description,
  Resource,
  UnixTimestamp,
} from "infrastructure/openapi/decorators";
import { Seconds } from "infrastructure/openapi/decorators";
import AutoAssign from "infrastructure/openapi/decorators/AutoAssign";
import DTO from "./DTO";

@Resource("API's Health information")
@AutoAssign
export default class Health extends DTO<Health> {
  @Seconds()
  @Description("Number of seconds since last restart.")
  public uptime?: number;

  @UnixTimestamp()
  @Description("Right now timestamp.")
  public readonly timestamp?: number = Date.now();
}
