import fs from "fs";
import glob from "glob";
import path from "path";
import ISetup from "infrastructure/ISetup";
import { directories } from "config";

/**
 * This class make globally available the services in the src/global dir
 *
 * @export
 * @class GlobalServices
 * @implements {ISetup}
 */
export default class GlobalServices implements ISetup {
  public setup(): void {
    const services = directories.global;

    // TODO: Account for decorators directory
    glob.sync(`${services}/*`).forEach((filePath: string) => {
      if (fs.lstatSync(path.resolve(filePath)).isDirectory()) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const service: any = require(filePath).default; // eslint-disable-line @typescript-eslint/no-var-requires

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any)[service.name] = service;
    });
  }
}
