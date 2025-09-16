require('dotenv').config()
const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const sendDiscordWebhook = require('@sselmann/cypress-discord-reporter');

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );
  allureWriter(on, config);

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  failOnStatusCode: false,
  e2e: {
    video: false,
    viewportHeight: 720,
    viewportWidth: 1280,
    defaultCommandTimeout: 35000,
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://hofgamers-git-develop-mkplace.vercel.app/",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
      requestMode: false,
      hideCredentials: true,
    },
    retries: {
      experimentalStrategy: 'detect-flake-and-pass-on-threshold',
      experimentalOptions: {
        maxRetries: 2,
        passesRequired: 1,
      },
      openMode: true,
      runMode: true,
    },
  },
});