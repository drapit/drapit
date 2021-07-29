import { logging } from "config";
import Loggeable from "application/interfaces/Loggeable";
import LoggerFactory from "infrastructure/factories/LoggerFactory";

export default class Logger {
  private static logger: Loggeable = LoggerFactory.create();

  public static verbose(...data: unknown[]): void {
    if (logging.level === 1) this.logger.verbose(...data);
  }

  public static debug(...data: unknown[]): void {
    if (logging.level <= 2) this.logger.debug(...data);
  }

  public static info(...data: unknown[]): void {
    if (logging.level <= 3) this.logger.info(...data);
  }

  public static warn(...data: unknown[]): void {
    if (logging.level <= 4) this.logger.warn(...data);
  }

  public static error(...data: unknown[]): void {
    if (logging.level <= 5) this.logger.error(...data);
  }
}
