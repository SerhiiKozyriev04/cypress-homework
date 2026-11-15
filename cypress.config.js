
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://example.cypress.io",

    setupNodeEvents(on, config) {
    },
  },

  viewportWidth: 1280,
  viewportHeight: 720,

  defaultCommandTimeout: 10000,

  video: false,

  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
});
