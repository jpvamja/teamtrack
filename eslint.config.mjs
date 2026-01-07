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
      /* ===== Code quality ===== */
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off", // we use winston, but console in dev is OK
      "no-undef": "error",

      /* ===== Async / Node ===== */
      "no-async-promise-executor": "error",
      "require-await": "warn",

      /* ===== Style (Prettier-friendly) ===== */
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "indent": ["error", 4, { SwitchCase: 1 }],

      /* ===== Safety ===== */
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
    },
  },
]);
