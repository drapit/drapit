import ConsoleLogger from "infrastructure/helpers/ConsoleLogger";

export const level = parseInt(process.env.API_LOGGING_LEVEL || '1', 10);

export const loggers = [
  new ConsoleLogger(),
];
