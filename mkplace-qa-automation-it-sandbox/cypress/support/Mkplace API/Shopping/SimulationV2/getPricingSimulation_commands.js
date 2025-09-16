const getPricingSimulationJson = require("../../../../fixtures/payloads/Mkplace API/Shopping/SimulationV2/getPricing.json")

Cypress.Commands.add('api_getPricingSimulation', () => {

    let token = Cypress.env("access_token")
    let skuId = Cypress.env('skuId')
    
    getPricingSimulationJson.skus[0].skuId = skuId

    cy.request({
        method: 'POST',
        url: 'https://itau-stg.mkplace.com.br/store/v2/checkoutSimulation',
        body: getPricingSimulationJson,
        headers: { Authorization: "Bearer "+token }
    }).then((response) => {
        Cypress.env("verifyTokenSimulation", response.body.verifyToken)
    })
})