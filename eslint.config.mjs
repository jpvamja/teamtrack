import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],

    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "coverage/",
    ],

    plugins: {
      js,
    },

    extends: [
      js.configs.recommended,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },

    rules: {
      // ---------- Variables ----------
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-undef": "error",

      // ---------- Async correctness ----------
      "no-async-promise-executor": "error",
      "require-await": "warn",
      "no-return-await": "warn",

      // ---------- Style (matches Prettier) ----------
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 4, { SwitchCase: 1 }],

      // ---------- Best practices ----------
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "consistent-return": "error",

      // ---------- Console ----------
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);
