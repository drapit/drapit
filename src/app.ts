// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import Server from "infrastructure/startup/Server";
import EventListeners from "infrastructure/startup/EventListeners";

new EventListeners().setup();
new Server().setup();
