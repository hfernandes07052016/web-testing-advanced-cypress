describe('Customer login', ()=>{
    it('Customer login Stage', () =>{
        cy.api_customerLoginStage()
            .then((response) => {
                expect(response.status).to.equal(200)
            })
    })

    it.only('Get All Offers', () =>{
        cy.api_customerLoginStage()
        cy.api_getAllOffers()
        cy.api_getPricingSimulation()
        cy.api_getCustomersProfile()
        cy.api_checkoutOrder()
        cy.api_updateOrderStatus()
        cy.api_getOfferByRef()
    })
})