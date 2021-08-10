import fs from "fs";
import glob from "glob";
import path from "path";
import ISetup from "infrastructure/ISetup";
import { directories } from "config";

// TODO: Account for decorators directory
export default class GlobalServices implements ISetup {
  public setup(): void {
    const services = directories.global;

    glob.sync(`${services}/*`).forEach((filePath: string) => {
      if (fs.lstatSync(path.resolve(filePath)).isDirectory()) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const service: any = require(filePath).default; // eslint-disable-line @typescript-eslint/no-var-requires

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any)[service.name] = service;
    });
  }
}
