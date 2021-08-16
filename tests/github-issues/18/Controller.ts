import MIMETypes from "application/enums/MIMETypes";
import { Responds } from "infrastructure/openapi/decorators";
import Resource from "./Resource";

export default class Controller {
  @Responds(200)
  public someAction(): void {
    // do stuff
  }

  @Responds(202)
  @Responds(404)
  public someOtherAction(): void {
    // do stuff
  }

  @Responds(200, Resource)
  public justSomeOtherAction(): void {
    // do stuff
  }

  @Responds(200, MIMETypes.pdf)
  public anotherAction(): void {
    // do stuff
  }

  @Responds(200, Resource, MIMETypes.xml)
  public justAnotherAction(): void {
    // do stuff
  }
}
