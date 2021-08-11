import { Resource, UnixTimestamp } from "infrastructure/openapi/decorators";
import { Seconds } from "infrastructure/openapi/decorators";

// TODO: move this to another file.
class DTO {
  public constructor(params: Partial<DTO>) {
    // The constructor is needed for @AutoAssign to work
  }
}

/**
 * Health Resource. Contains information about the health of the API.
 *
 * @export
 * @class Health
 * @extends {DTO}
 */
@Resource("API's Health information")
@AutoAssign
export default class Health extends DTO {
  /**
   * Number of seconds since last restart.
   *
   * @type {number}
   * @memberof Health
   */
  @Seconds()
  public uptime?: number;

  /**
   * Now Date and Time.
   *
   * @type {number}
   * @memberof Health
   */
  @UnixTimestamp()
  public readonly timestamp?: number = Date.now();
}

// TODO: move this to another file.
function AutoAssign<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    public constructor(...args: any[]) {
      super();
      const [params = {}] = args;

      Object.keys(params).forEach((key) => {
        (this as any)[key] = params[key];
      });
    }
  };
}
