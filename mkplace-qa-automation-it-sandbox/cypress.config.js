const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      if (config.env.sandbox) {
        return {
          // baseUrl: "http://itau-idp-stg.mkplace.com.br",
          env: {
            hideCredentials: true,
            requestMode: true,
            env: "sandbox",
            tokenRoot: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudFR5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhY2NvdW50SWQiOiIxIiwiY2xpZW50SWQiOiJiMjU3MTNlZi05YjEwLTQ5MmQtYmE0My1jYTEyMDJjMzYxZjQiLCJzY29wZXMiOlsib2F1dGgvY2xpZW50L3dyaXRlIiwib2F1dGgvY2xpZW50L3dyaXRlUHJvZmlsZSIsIm9hdXRoL2NsaWVudC9yZW1vdmVQcm9maWxlIiwib2F1dGgvY2xpZW50L3Rva2VuIiwib2F1dGgvdXNlci93cml0ZSIsIm9hdXRoL3VzZXIvdG9rZW4iXSwiZXhwaXJlc0F0IjowLCJpYXQiOjE2MzY2MzQxMDJ9.wdoKJ1Pyl2Bwn-IrBSKnw-94cv-rRQzNW35NsQzjtHE",
          },
        };
      } else
        return {
          // baseUrl: "http://itau-idp-stg.mkplace.com.br",
          env: {
            hideCredentials: true,
            requestMode: true,
            env: "development",
            tokenRoot: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncmFudFR5cGUiOiJjbGllbnRfY3JlZGVudGlhbHMiLCJhY2NvdW50SWQiOiIxIiwiY2xpZW50SWQiOiJiMjU3MTNlZi05YjEwLTQ5MmQtYmE0My1jYTEyMDJjMzYxZjQiLCJzY29wZXMiOlsib2F1dGgvY2xpZW50L3dyaXRlIiwib2F1dGgvY2xpZW50L3dyaXRlUHJvZmlsZSIsIm9hdXRoL2NsaWVudC9yZW1vdmVQcm9maWxlIiwib2F1dGgvY2xpZW50L3Rva2VuIiwib2F1dGgvdXNlci93cml0ZSIsIm9hdXRoL3VzZXIvdG9rZW4iXSwiZXhwaXJlc0F0IjowLCJpYXQiOjE2MzY2MzQxMDJ9.wdoKJ1Pyl2Bwn-IrBSKnw-94cv-rRQzNW35NsQzjtHE",
          },
        };
    //   baseUrl: 'https://sandbox.mkplace.com.br',
    //     env: {
    //
    //
    // },
    },
    fixturesFolder: false,
    video: true,
  },
})
