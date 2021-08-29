import fs from "fs";
import path from "path";
import glob from "glob";
import OpenApiGenerator from "./OpenApiGenerator";
import { OpenApiBuilder } from "openapi3-ts";

type SetupOptions = {
  apiDir: string;
  apiName: string;
  maintainerName: string,
  maintainerEmail: string,
  maintainerUrl: string,
  swaggerDir: string,
}

/**
 * This class generates swagger/openapi documentation files.
 *
 * @export
 * @class Swagger
 * @implements {ISetup}
 */
export default class Setup {
  // TODO: split into smaller methods
  public setup(options: SetupOptions): void {
    glob.sync(`${options.apiDir}/v*`).forEach((versionDir: string) => {
      if (!fs.lstatSync(path.resolve(versionDir)).isDirectory()) return;
      const directories = versionDir.split("/");
      const version = directories[directories.length - 1];
      const controllersDir = `${versionDir}/controllers`;

      const documentation = new OpenApiBuilder();
      documentation.addTitle(options.apiName);
      documentation.addVersion(version);
      documentation.addContact({
        name: options.maintainerName,
        email: options.maintainerEmail,
        url: options.maintainerUrl,
      });

      documentation.addServer({
        url: `/api/${version}`,
        description: "Current Environment",
      });

      fs.readdirSync(controllersDir).forEach((fileName: string) => {
        const fullPath = `${controllersDir}/${fileName}`;

        if (fs.lstatSync(fullPath).isDirectory()) return;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Controller = require(fullPath).default;
        const tags = Reflect.getMetadata("tags", Controller);

        for (const tag of tags) {
          documentation.addTag(tag);
        }

        new OpenApiGenerator(Controller, documentation).generate();

        if (!fs.existsSync(options.swaggerDir)) {
          fs.mkdirSync(options.swaggerDir);
        }

        const swaggerFile = `${options.swaggerDir}/swagger.${version}.json`;
        fs.writeFileSync(swaggerFile, documentation.getSpecAsJson(), "utf8");

        Logger.verbose(`${swaggerFile} successfully generated`);
      });
    });
  }
}
