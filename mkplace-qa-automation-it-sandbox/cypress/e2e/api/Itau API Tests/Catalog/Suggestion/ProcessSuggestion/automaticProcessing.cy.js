describe('Automatic Processing - SUGGESTION-NEW', () => {
        
    it('Create Suggestion SUGGESTION-NEW - changing sellerSkuId and other insformations', () => {
        
        const typeSuggestion = "suggestion-new"

        cy.api_customerLoginStage()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant(typeSuggestion)
        cy.wait(20000)
    
    })
        
    it('Validating Suggestion after Automatic Processing', () => {
            
            let suggestionId = Cypress.env("suggestionId")

            cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("PENDING")
            expect(response.body.type).to.equal("SUGGESTION-NEW") 
            expect(response.body.variants[0].sellerSkuId).to.be.not.null 
            expect(response.body.variants[0].status).to.equal("PENDING")
            //expect(response.body.variants[0].type).to.equal("SUGGESTION-NEW")
            })

    })

})

describe('Automatic Processing - SUGGESTION-MATCH', () => {

    it('Create Suggestion SUGGESTION-MATCH - changing sellerSkuId and ean', () => {
        
        const typeSuggestion = "suggestion-match"

        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant(typeSuggestion)
        cy.wait(20000)
    
    })
        
    it('Validating Suggestion after Automatic Processing', () => {
            
            let suggestionId = Cypress.env("suggestionId")

            cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("PENDING")
            //expect(response.body.type).to.equal("SUGGESTION-MATCH") 
            expect(response.body.variants[0].sellerSkuId).to.be.not.null 
            expect(response.body.variants[0].status).to.equal("PENDING")
            //expect(response.body.variants[0].type).to.equal("SUGGESTION-MATCH")
            })

    })
})

describe('Automatic Processing - EXACTLY-MATCH', () => {

    it('Create Suggestion EXACTLY-MATCH - changing only sellerSkuId', () => {
        
        const typeSuggestion = "exactly-match"

        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant(typeSuggestion)
        cy.wait(20000)
    
    })
        
    it('Validating Suggestion after Automatic Processing', () => {
            
            let suggestionId = Cypress.env("suggestionId")

            cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("PENDING")
            //expect(response.body.type).to.equal("EXACTLY-MATCH") 
            expect(response.body.variants[0].sellerSkuId).to.be.not.null 
            expect(response.body.variants[0].status).to.equal("PENDING")
           //expect(response.body.variants[0].type).to.equal("EXACTLY-MATCH")
            })

    })
})
