import Loggeable from "application/interfaces/Loggeable";
import { logging } from "config";

export default class Logger {
  private static loggers: Loggeable[] = logging.loggers;

  public static verbose(...data: unknown[]): void {
    if (logging.level === 1) {
      for (const logger of this.loggers) {
        try {
          logger.verbose(...data);
        } catch(e) {
          console.error(e);
        }
      }
    }
  }

  public static debug(...data: unknown[]): void {
    if (logging.level <= 2) {
      for (const logger of this.loggers) {
        try {
          logger.debug(...data);
        } catch(e) {
          console.error(e);
        }
      }
    }
  }

  public static info(...data: unknown[]): void {
    if (logging.level <= 3) {
      for (const logger of this.loggers) {
        try {
          logger.info(...data);
        } catch(e) {
          console.error(e);
        }
      }
    }
  }

  public static warn(...data: unknown[]): void {
    if (logging.level <= 4) {
      for (const logger of this.loggers) {
        try {
          logger.warn(...data);
        } catch(e) {
          console.error(e);
        }
      }
    }
  }

  public static error(...data: unknown[]): void {
    if (logging.level <= 5) {
      for (const logger of this.loggers) {
        try {
          logger.error(...data);
        } catch(e) {
          console.error(e);
        }
      }
    }
  }
}
