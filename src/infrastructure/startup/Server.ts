
import ExpressServer from ".framework/servers/express";
import ISetup from "infrastructure/ISetup";

/**
 * This class sets up and un the express server.
 *
 * @export
 * @class Server
 * @implements {ISetup}
 */
export default class Server implements ISetup {
  public setup(): void {
    new ExpressServer().setup();
  }
}
