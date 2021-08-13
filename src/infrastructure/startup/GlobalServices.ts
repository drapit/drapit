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

    glob.sync(`${services}/extensions/*`).forEach((filePath: string) => {
      console.log('=============', filePath)
      if (fs.lstatSync(path.resolve(filePath)).isDirectory()) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      require(filePath); // eslint-disable-line @typescript-eslint/no-var-requires
    });

    console.log(`${services}/extensions`)
    console.log([{a: 1, b: 2}].toMap("a").toJSON())

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
