
const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,

  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto2.forstudy.space",
  },

  env: {
    email: "qa.serhii02@example.com",
    password: "TestPassword123",
  },
});
