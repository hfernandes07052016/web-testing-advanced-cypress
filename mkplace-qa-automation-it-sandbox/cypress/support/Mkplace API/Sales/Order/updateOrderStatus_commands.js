const updateOrderStatusJson = require("../../../../fixtures/payloads/Mkplace API/Sales/Order/updateOrderStatus.json")

Cypress.Commands.add('api_updateOrderStatus', () => {

    let access_token = Cypress.env('access_token')
    let idOrder = Cypress.env('idOrder')

    updateOrderStatusJson.ref = idOrder


    cy.request({
        method: 'POST',
        url: 'https://itau-stg.mkplace.com.br/sales/order/updateStatus',
        body: updateOrderStatusJson,
        headers: { Authorization: "Bearer "+access_token }
    }).then((response) => {
        Cypress.env("idOrder", response.body._id)
    })
})