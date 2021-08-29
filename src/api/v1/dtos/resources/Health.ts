import {
  Description,
  IsBinary,
  Resource,
  UnixTimestamp,
  Seconds,
  AutoAssignable,
} from ".framework/api/decorators";
import { DTO, SimpleFile } from ".framework/api/dto";

@AutoAssignable
@Resource("API's Health information")
export default class Health extends DTO {
  @Seconds()
  @Description("Number of seconds since last restart.")
  public uptime: number;

  @UnixTimestamp()
  @Description("Right now timestamp.")
  public readonly timestamp: number = Date.now();

  @IsBinary()
  public someFile: SimpleFile;
}
