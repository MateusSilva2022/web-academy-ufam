const tsParser = require("@typescript-eslint/parser");
const tsPlugin = require("@typescript-eslint/eslint-plugin");

module.exports = [
    {
        files: ["**/*.ts"],
        ignores: ["node_modules/**", "build/**"],
        languageOptions: {
            parser: tsParser
        },
        plugins: {
            "@typescript-eslint": tsPlugin
        },
        rules: {}
    }
];