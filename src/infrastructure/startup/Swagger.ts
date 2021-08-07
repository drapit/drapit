import ISetup from "infrastructure/ISetup";
import fs from "fs";
import path from "path";
import glob from "glob";
import OpenApiGenerator from "infrastructure/server/openapi/OpenApiGenerator";
import { OpenApiBuilder } from "openapi3-ts";
import * as config from "config";

export default class Swagger implements ISetup {
  public setup(): void {
    const directory = path.join(__dirname, "../../controllers");

    glob.sync(`${directory}/v*`).forEach((directoryPath: string) => {
      if (!fs.lstatSync(path.resolve(directoryPath)).isDirectory()) return;
      const directories = directoryPath.split("/");
      const version = directories[directories.length - 1];

      const documentation = new OpenApiBuilder();
      documentation.addTitle(config.api.name);
      documentation.addVersion(version);
      documentation.addContact({
        name: config.maintainer.name,
        email: config.maintainer.email,
        url: config.maintainer.url,
      });

      documentation.addServer({
        url: `/api/${version}`,
        description: "Current Environment",
      });

      fs.readdirSync(directoryPath).forEach((fileName: string) => {
        const fullPath = `${directoryPath}/${fileName}`;

        if (fs.lstatSync(fullPath).isDirectory()) return;

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Controller = require(fullPath).default;

        new OpenApiGenerator(Controller, documentation).generate();

        const swaggerDir = './.swagger';
        if (!fs.existsSync(swaggerDir)) {
          fs.mkdirSync(swaggerDir);
        }

        const swaggerFile = `${swaggerDir}/swagger.${version}.json`;
        fs.writeFileSync(swaggerFile, documentation.getSpecAsJson(), "utf8");

        Logger.verbose(`${swaggerFile} successfully generated`);
      });
    });
  }
}
