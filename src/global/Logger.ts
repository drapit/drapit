import ILogger from "application/interfaces/ILogger";
import { logging } from "config";

/**
 * Global service which allows to log to multiple implementations at once.
 *
 * @export
 * @class Logger
 */
export default class Logger {
  private static loggers: ILogger[] = logging.loggers;

  public static verbose(...data: unknown[]): void {
    for (const logger of this.loggers) {
      try {
        logger.verbose(...data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  public static debug(...data: unknown[]): void {
    for (const logger of this.loggers) {
      try {
        logger.debug(...data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  public static info(...data: unknown[]): void {
    for (const logger of this.loggers) {
      try {
        logger.info(...data);
      } catch (e) {
        console.error(e);
      }
    }
  }

  public static warn(...data: unknown[]): void {
    if (logging.level <= 4) {
      for (const logger of this.loggers) {
        try {
          logger.warn(...data);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }

  public static error(...data: unknown[]): void {
    for (const logger of this.loggers) {
      try {
        logger.error(...data);
      } catch (e) {
        console.error(e);
      }
    }
  }
}
