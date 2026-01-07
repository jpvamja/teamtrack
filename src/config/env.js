import dotenv from "dotenv";

dotenv.config();

/**
 * =========================
 * Helper functions
 * =========================
 */
const requireEnv = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `❌ Missing required environment variable: ${key}`
    );
  }
  return value;
};

const requireNumber = (key, fallback) => {
  const value = process.env[key];
  if (!value) return fallback;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(
      `❌ Environment variable ${key} must be a number`
    );
  }
  return parsed;
};

/**
 * =========================
 * Environment configuration
 * =========================
 */
const env = {
  NODE_ENV: process.env.NODE_ENV || "development",

  PORT: requireNumber("PORT", 5000),

  MONGO_URI: requireEnv("MONGO_URI"),

  // 🔐 JWT secrets (separate by purpose)
  JWT_ACCESS_SECRET: requireEnv("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),

  ACCESS_TOKEN_EXPIRY:
    process.env.ACCESS_TOKEN_EXPIRY || "15m",

  REFRESH_TOKEN_EXPIRY:
    process.env.REFRESH_TOKEN_EXPIRY || "7d",
};

/**
 * =========================
 * Production hardening
 * =========================
 */
if (env.NODE_ENV === "production") {
  if (!process.env.ACCESS_TOKEN_EXPIRY) {
    throw new Error(
      "❌ ACCESS_TOKEN_EXPIRY must be set in production"
    );
  }

  if (!process.env.REFRESH_TOKEN_EXPIRY) {
    throw new Error(
      "❌ REFRESH_TOKEN_EXPIRY must be set in production"
    );
  }
}

export default env;
