import ISetup from "infrastructure/ISetup";
import * as config from "config";
import { OpenApiSetup } from ".framework/openapi";

/**
 * This class generates swagger/openapi documentation files.
 *
 * @export
 * @class Swagger
 * @implements {ISetup}
 */
export default class Swagger implements ISetup {
  private static readonly API_DIR: string = config.directories.api;

  public setup(): void {
    new OpenApiSetup().setup({
      apiDir: Swagger.API_DIR,
      apiName: config.api.name,
      maintainerName: config.maintainer.name,
      maintainerEmail: config.maintainer.email,
      maintainerUrl: config.maintainer.url,
      swaggerDir: `${config.directories.root}/.swagger`,
    });
  }
}
