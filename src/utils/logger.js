import winston from "winston";
import env from "../config/env.js";

const { combine, timestamp, printf, errors, json, colorize } = winston.format;

/**
 * Custom log format for development
 */
const devFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

/**
 * Create Winston logger
 */
const logger = winston.createLogger({
    level: env.NODE_ENV === "production" ? "info" : "debug",

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

    transports: [
        new winston.transports.Console(),
    ],

    exitOnError: false,
});

export default logger;
