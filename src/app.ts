import GlobalServices from "infrastructure/startup/GlobalServices";
import Server from "infrastructure/startup/Server";
import EventListeners from "infrastructure/startup/EventListeners";
import Swagger from "infrastructure/startup/Swagger";

/**
 * Main class, this is the entry point to the system.
 *
 * @class API
 */
class API {
  public static setup() {
    new GlobalServices().setup();
    new EventListeners().setup();
    new Swagger().setup();
    new Server().setup();
  }
}

// Run the api...
API.setup();
