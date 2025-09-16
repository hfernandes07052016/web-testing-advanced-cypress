const customerStageJson = require("../../../fixtures/payloads/Itaú Shop/Customer/customerSTG.json")

Cypress.Commands.add('api_customerLoginStage', () => {

    cy.request({
        method: 'POST',
        url: 'http://itau-idp-stg.mkplace.com.br/realms/mkplace-itaushop-stg/protocol/openid-connect/token',
        body: customerStageJson,
        form: true
    }).then((response) => {
        Cypress.env("access_token", response.body.access_token)
    })
})