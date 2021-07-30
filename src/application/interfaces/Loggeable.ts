export default interface Loggeable {
  verbose(...data: unknown[]): void;
  debug(...data: unknown[]): void;
  info(...data: unknown[]): void;
  warn(...data: unknown[]): void;
  error(...data: unknown[]): void;
}
