
const { defineConfig } = require("cypress");
const baseConfig = require("./cypress.config");

module.exports = defineConfig({
  ...baseConfig,

  e2e: {
    ...baseConfig.e2e,
    baseUrl: "https://qauto.forstudy.space",
  },

  env: {
    email: "qa.serhii01@example.com",
    password: "TestPassword123",
  },
});
