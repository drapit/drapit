import GlobalServices from "infrastructure/startup/GlobalServices";
import Server from "infrastructure/startup/Server";
import EventListeners from "infrastructure/startup/EventListeners";
import Swagger from "infrastructure/startup/Swagger";

new GlobalServices().setup();
new EventListeners().setup();
new Swagger().setup();
new Server().setup();
