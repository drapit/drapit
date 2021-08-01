// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import GlobalServices from "infrastructure/startup/GlobalServices";
import Server from "infrastructure/startup/Server";
import EventListeners from "infrastructure/startup/EventListeners";

new GlobalServices().setup();
new EventListeners().setup();
new Server().setup();
