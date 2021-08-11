import ConsoleLogger from "infrastructure/loggers/ConsoleLogger";

// Log level of the application.
export const level = parseInt(process.env.API_LOGGING_LEVEL || '1', 10);

// All loggers you want the application to log to.
export const loggers = [
  new ConsoleLogger(),
];
