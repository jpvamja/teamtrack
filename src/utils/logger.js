import winston from "winston";
import env from "../config/env.js";

const { combine, timestamp, printf, errors, json, colorize } =
  winston.format;

/**
 * Custom log format for development
 */
const devFormat = printf(
  ({ level, message, timestamp, stack, requestId }) => {
    return `${timestamp} [${level}]${
      requestId ? ` [${requestId}]` : ""
    }: ${stack || message}`;
  }
);

/**
 * Base logger
 */
const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",

  defaultMeta: {
    service: "teamtrack-api",
    environment: env.NODE_ENV,
  },

  format:
    env.NODE_ENV === "production"
      ? combine(
          timestamp(),
          errors({ stack: true }),
          json()
        )
      : combine(
          colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: true }),
          devFormat
        ),

  transports: [new winston.transports.Console()],

  exitOnError: false,
});

/**
 * Request-scoped logger helper
 * Allows correlation via requestId
 */
export const withRequestLogger = (req) => {
  return logger.child({
    requestId: req.requestId,
  });
};

export default logger;
