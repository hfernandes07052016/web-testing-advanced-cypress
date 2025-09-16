const checkoutOrderJson = require("../../../../fixtures/payloads/Mkplace API/Sales/Order/checkoutOrder.json")

Cypress.Commands.add('api_checkoutOrder', () => {

    let skuId = Cypress.env('skuId')
    let verifyTokenCustomerProfile = Cypress.env("verifyTokenCustomerProfile")
    let verifyTokenSimulation = Cypress.env("verifyTokenSimulation")
    let access_token = Cypress.env('access_token')

    checkoutOrderJson.shoppingCart[0].skuId = skuId
    checkoutOrderJson.tokens.customer = verifyTokenCustomerProfile
    checkoutOrderJson.tokens.simulation = verifyTokenSimulation


    cy.request({
        method: 'POST',
        url: 'https://itau-stg.mkplace.com.br/sales/order/checkout',
        body: checkoutOrderJson,
        headers: { Authorization: "Bearer "+access_token}
    }).then((response) => {
        Cypress.env("idOrder", response.body._id)
    })
})