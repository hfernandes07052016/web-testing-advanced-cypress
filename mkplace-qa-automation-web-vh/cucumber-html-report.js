const report = require("multiple-cucumber-html-reporter");
report.generate({
  jsonDir: "jsonlogs", // ** Path of .json file **//
  reportPath: "./cypress/reports/cucumber-html-report",
  metadata: {
    browser: {
      name: "chrome",
      version: "Versão 122.0.6261.128",
    },
    device: "Local test machine",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Automation Web - Victor Hugo" },
      { label: "Release", value: "release-02-14-2024-20h00" }
    ],
  },
});
