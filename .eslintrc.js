/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "@remix-run/eslint-config/jest",
    "prettier",
  ],
  plugins: ["prettier"],
  // we're using vitest which has a very similar API to jest
  // (so the linting plugins work nicely), but it we have to explicitly
  // set the jest version.
  rules: {
    "prettier/prettier": "error",
  },
  settings: {
    jest: {
      version: 27,
    },
  },
};
