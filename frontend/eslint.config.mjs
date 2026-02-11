import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Disable the unescaped entities rule globally
      'react/no-unescaped-entities': 'off',
      // You can add any other rules you want to disable here
      // '@next/next/no-page-custom-font': 'off',
    },
  },
];

export default eslintConfig;