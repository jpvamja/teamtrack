import dotenv from "dotenv";

dotenv.config();

const env = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY
};

if (!env.MONGO_URI || !env.JWT_SECRET) {
    throw new Error("Missing required environment variables");
}

export default env;
