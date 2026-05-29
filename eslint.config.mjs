import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default defineConfig([
  js.configs.recommended,
  ...nextVitals,
  ...tseslint.configs.strictTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },

  {
    files: ["**/*.{js,jsx,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),

  eslintConfigPrettier,
]);
