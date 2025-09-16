
Cypress.Commands.add('api_getCustomersProfile', () => {
    let token = Cypress.env("access_token")

    cy.request({
        method: 'GET',
        url: 'https://itau-stg.mkplace.com.br/customer/v2/profile',
        headers: { Authorization: "Bearer "+token }
    }).then((response) => {
        expect(response.status).to.eq(200)
        Cypress.env('verifyTokenCustomerProfile', response.body.verifyToken)
    })
})