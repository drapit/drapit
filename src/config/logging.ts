import Loggers from "infrastructure/enums/Loggers";

export const logger = process.env.API_LOGGER || Loggers.CONSOLE;
export const level = parseInt(process.env.API_LOGGING_LEVEL || '1', 10);
