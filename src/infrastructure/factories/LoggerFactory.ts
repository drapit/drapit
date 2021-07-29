import Loggeable from "application/interfaces/Loggeable";
import { logging } from "config";
import Loggers from "../enums/Loggers";
import ConsoleLogger from "../helpers/ConsoleLogger";

export default class LoggerFactory {
    public static create(): Loggeable {
        switch (logging.logger) {
            case Loggers.CONSOLE:
                return new ConsoleLogger();
            default:
                return new ConsoleLogger();
        }
    }
}
