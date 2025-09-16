

Cypress.Commands.add('api_getOfferByRef', () => {

    let token = Cypress.env("access_token")
    let idOffer = Cypress.env("idOffer")
    let stockBalance = Cypress.env("stockBalance")
    let newStockBalance = stockBalance - 1

    cy.request({
        method: 'POST',
        url: 'https://itau-stg.mkplace.com.br/store/offer/byRef',
        body: {
            "skus": [
                {
                    "ref": idOffer
                }
            ]
        },
        headers: { Authorization: "Bearer "+token }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(newStockBalance).to.eq(stockBalance -1)

    })
})