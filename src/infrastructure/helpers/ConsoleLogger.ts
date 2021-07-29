import { logging } from "config";
import Loggeable from "application/interfaces/Loggeable";

export default class ConsoleLogger implements Loggeable {
  public verbose(...data: unknown[]): void {
    if (logging.level === 1) console.log(...data);
  }

  public debug(...data: unknown[]): void {
    if (logging.level <= 2) console.debug(...data);
  }

  public info(...data: unknown[]): void {
    if (logging.level <= 3) console.info(...data);
  }

  public warn(...data: unknown[]): void {
    if (logging.level <= 4) console.warn(...data);
  }

  public error(...data: unknown[]): void {
    if (logging.level <= 5) console.error(...data);
  }
}
