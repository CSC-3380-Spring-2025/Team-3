const { rules } = require("eslint-config-prettier");

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    rules: {},
};