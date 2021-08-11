/**
 * Interface of system loggers.
 *
 * @export
 * @interface ILogger
 */
export default interface ILogger {
  /**
   * Verbose logs.
   *
   * @param {...unknown[]} data
   * @memberof ILogger
   */
  verbose(...data: unknown[]): void;
  
  /**
   * Debugging logs.
   *
   * @param {...unknown[]} data
   * @memberof ILogger
   */
  debug(...data: unknown[]): void;

  /**
   * Informational logs.
   *
   * @param {...unknown[]} data
   * @memberof ILogger
   */
  info(...data: unknown[]): void;

  /**
   * Warning logs.
   *
   * @param {...unknown[]} data
   * @memberof ILogger
   */
  warn(...data: unknown[]): void;

  /**
   * Error logs.
   *
   * @param {...unknown[]} data
   * @memberof ILogger
   */
  error(...data: unknown[]): void;
}
