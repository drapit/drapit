import { Resource, UnixTimestamp } from "infrastructure/openapi/decorators";
import { Seconds } from "infrastructure/openapi/decorators";

@Resource("API's Health information")
export default class Health {
  @Seconds()
  public uptime?: number;
  
  @UnixTimestamp()
  public timestamp?: number;

  public constructor(params: Partial<Health> = {}) {
    this.uptime = params.uptime;
    this.timestamp = params.timestamp;
  }
}
