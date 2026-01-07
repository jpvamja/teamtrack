import dotenv from "dotenv";

dotenv.config();

/**
 * Validate required environment variables at startup
 * Fail fast instead of crashing later
 */
const requiredEnvVars = [
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
];

requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        throw new Error(`❌ Missing required environment variable: ${key}`);
    }
});

const env = {
    PORT: Number(process.env.PORT) || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",

    MONGO_URI: process.env.MONGO_URI,

    JWT_SECRET: process.env.JWT_SECRET,

    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "15m",
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

export default env;
