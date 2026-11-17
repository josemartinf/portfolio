import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "public/assets/**", "envo/**"]),
  { files: ["src/app/layout.tsx"], rules: { "@next/next/no-sync-scripts": "off", "@next/next/no-css-tags": "off" } },
  { files: ["src/components/sections/About.tsx"], rules: { "@next/next/no-img-element": "off" } },
]);
