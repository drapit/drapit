import fs from "fs";
import glob from "glob";
import path from "path";
import ISetup from "infrastructure/ISetup";

export default class GlobalServices implements ISetup {
  public setup(): void {
    const services = path.join(__dirname, "../../services");
    
    glob.sync(`${services}/*`).forEach((filePath: string) => {
      if (fs.lstatSync(path.resolve(filePath)).isDirectory()) return;

      require(filePath);
    });
  }
}
