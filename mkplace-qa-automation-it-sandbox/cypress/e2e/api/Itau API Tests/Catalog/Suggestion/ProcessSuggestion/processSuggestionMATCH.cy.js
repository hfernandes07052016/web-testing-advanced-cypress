describe('Process Suggestion (1 variant) - MATCH Sku Published', () => {

    it('Create Sku / Cluster', () => {
        cy.api_generateClientTokenDevAdmin()       

        cy.api_createCluster().then((response) => {
            Cypress.env('clusterIdPublished', response.body._id)
            Cypress.env('slugCluster', response.body.slug)
            })

            cy.api_createSku().then((response) => {
            Cypress.env('skuIdPublished', response.body._id)
            Cypress.env('slugSku', response.body.slug)
            })
    })

    it('Publish Sku / Cluster', () => {

        let skuIdPublished = Cypress.env('skuIdPublished')
        let clusterIdPublished = Cypress.env('clusterIdPublished')

        cy.api_publishSku(skuIdPublished).then((response) => {
            expect(response.status).to.equal(202)
            expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(5000)
        cy.api_publishCluster(clusterIdPublished).then((response) => {
            expect(response.status).to.equal(202)
            expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(5000)
        cy.log("Validate Sku - isPublished and lastPublish")
        cy.api_getSkuById(skuIdPublished).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null
        })
    })
        
    it('Generate New Suggestion for MATCH', () => {
        
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant()
        cy.wait(20000) //Tem que ter Wait grande para contemplar o processamento automático
        cy.api_getSuggestionById()
    })
    
    it('Proccess Suggestion MATCH with SKU Published', () => {

        let suggestionId = Cypress.env("suggestionId")
        
        let skuIdPublished = Cypress.env("skuIdPublished")
        let sellerSkuId = Cypress.env("sellerSkuId")
        let eanSku = Cypress.env("eanSku")        
        let attributesNameSku = Cypress.env("attributesNameSku")
        let attributesCodeSku = Cypress.env("attributesCodeSku")
        let attributesValuesCodeSku = Cypress.env("attributesValuesCodeSku")
        let attributesValuesValueSku = Cypress.env("attributesValuesValueSku")
        
        let clusterIdPublished = Cypress.env("clusterIdPublished")
        let nameCluster = Cypress.env("nameCluster")    
        let attributesNameCluster = Cypress.env("attributesNameCluster")
        let attributesCodeCluster = Cypress.env("attributesCodeCluster")
        let attributesValuesCodeCluster = Cypress.env("attributesValuesCodeCluster")
        let attributesValuesValueCluster = Cypress.env("attributesValuesValueCluster")

        

        cy.api_generateClientTokenDevAdmin()    
        cy.api_processSuggestionMATCH(skuIdPublished,clusterIdPublished,sellerSkuId)
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Match successfully done. An offer to SKU " + skuIdPublished + " will be processed.")
        })
        cy.log("Validação do Match na Suggestion")
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.contains("MATCH")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.contains("MATCH")
            expect(response.body._id).to.be.equal(suggestionId)
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.equal(skuIdPublished)  
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdPublished)
            expect(response.body.variants[0].sku.ean).to.be.equal(eanSku)  
            expect(response.body.variants[0].sku.attributes[0].required).to.be.equal(false)
            expect(response.body.variants[0].sku.attributes[0].sort).to.be.equal(0)
            expect(response.body.variants[0].sku.attributes[0]._id).to.be.not.null
            expect(response.body.variants[0].sku.attributes[0].name).to.be.equal(attributesNameSku)
            expect(response.body.variants[0].sku.attributes[0].code).to.be.equal(attributesCodeSku)
            expect(response.body.variants[0].sku.attributes[0].values[0].sort).to.be.equal(0)
            expect(response.body.variants[0].sku.attributes[0].values[0]._id).to.be.not.null
            expect(response.body.variants[0].sku.attributes[0].values[0].code).to.be.equal(attributesValuesCodeSku)
            expect(response.body.variants[0].sku.attributes[0].values[0].value).to.be.equal(attributesValuesValueSku)
            expect(response.body.variants[0].sku.isPublished).to.be.equal(true) 
            expect(response.body.variants[0].sku.lastPublish).to.be.not.null            
            expect(response.body.cluster._id).to.be.equal(clusterIdPublished)
            expect(response.body.cluster.name).to.be.equal(nameCluster)
            expect(response.body.cluster.attributes[0].required).to.be.equal(false)
            expect(response.body.cluster.attributes[0].sort).to.be.equal(0)
            expect(response.body.cluster.attributes[0]._id).to.be.not.null
            expect(response.body.cluster.attributes[0].name).to.be.equal(attributesNameCluster)
            expect(response.body.cluster.attributes[0].code).to.be.equal(attributesCodeCluster)
            expect(response.body.cluster.attributes[0].values[0].sort).to.be.equal(0)
            expect(response.body.cluster.attributes[0].values[0]._id).to.be.not.null
            expect(response.body.cluster.attributes[0].values[0].code).to.be.equal(attributesValuesCodeCluster)
            expect(response.body.cluster.attributes[0].values[0].value).to.be.equal(attributesValuesValueCluster)
            expect(response.body.cluster.isPublished).to.be.equal(true)
            expect(response.body.cluster.lastPublish).to.be.not.null


        })

    })

    it('Validate Product (Variants by Id List) - New offer created', () => {
     
        let skuId = Cypress.env('skuIdPublished')
        let slugSku = Cypress.env('slugSku')
        let storeIdSuggestion = Cypress.env('storeIdSuggestion')
        let slugCluster = Cypress.env('slugCluster')
        let tagsSku = Cypress.env('tagsSku')
        let categoriesSku = Cypress.env('categoriesSku')
        let typeSku = Cypress.env('typeSku')
        let eanSku = Cypress.env('eanSku')
        let descriptionSku = Cypress.env('descriptionSku')
        let attributesNameSku = Cypress.env('attributesNameSku')
        let attributesValuesValueSku = Cypress.env('attributesValuesValueSku')
        let attributesCodeSku = Cypress.env('attributesCodeSku')    
        let attributesValuesCodeSku = Cypress.env('attributesValuesCodeSku') 
        let staticAttributesNameSku = Cypress.env('staticAttributesNameSku')
        let staticAttributesCodeSku = Cypress.env('staticAttributesCodeSku')
        let staticAttributesValuesCodeSku = Cypress.env('staticAttributesValuesCodeSku')
        let staticAttributesValuesValueSku = Cypress.env('staticAttributesValuesValueSku')              
        let brandCluster = Cypress.env('brandCluster')       
        let attributesNameCluster = Cypress.env('attributesNameCluster')
        let attributesCodeCluster = Cypress.env('attributesCodeCluster')
        let attributesValuesCodeCluster = Cypress.env("attributesValuesCodeCluster")
        let attributesValuesValueCluster = Cypress.env('attributesValuesValueCluster')       
        let nameCluster = Cypress.env('nameCluster')
        let nameSku = Cypress.env('nameSku')
        let descriptionCluster = Cypress.env('descriptionCluster')
        let clusterId = Cypress.env("clusterId")
        let imageSortSku = Cypress.env('imageSortSku')
        let imageExtSku = Cypress.env('imageExtSku')
        let imagePathSku = Cypress.env('imagePathSku')
        let metadataSku = Cypress.env('metadataSku')
        let videoTypeSku = Cypress.env('videoTypeSku')
        let videoUrlSku = Cypress.env('videoUrlSku')

        cy.api_getVariantsbyIdList(skuId).then((response) => {
    
            expect(response.status).to.equal(200)
            expect(response.body[0].storeId).to.equal(storeIdSuggestion)
            expect(response.body[0].skuId).to.be.equal(skuId)            
            expect(response.body[0].attributes[0].required).to.equal(false)
            expect(response.body[0].attributes[0].sort).to.equal(0)            
            expect(response.body[0].attributes[0].name).to.equal(attributesNameSku)
            expect(response.body[0].attributes[0].code).to.equal(attributesCodeSku)
            expect(response.body[0].attributes[0].values[0].sort).to.equal(0)
            expect(response.body[0].attributes[0].values[0].code).to.equal(attributesValuesCodeSku)
            expect(response.body[0].attributes[0].values[0].value).to.equal(attributesValuesValueSku)
            expect(response.body[0].staticAttributes[0].required).to.equal(false)
            expect(response.body[0].staticAttributes[0].sort).to.equal(0)            
            expect(response.body[0].staticAttributes[0].name).to.equal(staticAttributesNameSku)
            expect(response.body[0].staticAttributes[0].code).to.equal(staticAttributesCodeSku)
            expect(response.body[0].staticAttributes[0].values[0].sort).to.equal(0)
            expect(response.body[0].staticAttributes[0].values[0].code).to.equal(staticAttributesValuesCodeSku)
            expect(response.body[0].staticAttributes[0].values[0].value).to.equal(staticAttributesValuesValueSku)
            expect(response.body[0].brand).to.equal(brandCluster)
            expect(response.body[0].categories[0]).to.equal(categoriesSku)
            expect(response.body[0].collections).to.have.length(0)
            expect(response.body[0].description).to.equal(descriptionSku)
            expect(response.body[0].ean).to.equal(eanSku)
            expect(response.body[0].images[0].sort).to.be.equal(imageSortSku)
            expect(response.body[0].images[0].ext).to.be.equal(imageExtSku)
            expect(response.body[0].images[0].path).to.be.equal(imagePathSku)
            expect(response.body[0].metadata.metadataSku).to.be.equal(metadataSku)
            expect(response.body[0].name).to.be.equal(nameSku)
            expect(response.body[0].productAttributes[0].required).to.equal(false)
            expect(response.body[0].productAttributes[0].sort).to.equal(0)            
            expect(response.body[0].productAttributes[0]._id).to.be.not.null
            expect(response.body[0].productAttributes[0].name).to.equal(attributesNameCluster)
            expect(response.body[0].productAttributes[0].code).to.equal(attributesCodeCluster)
            expect(response.body[0].productAttributes[0].values[0].sort).to.equal(0)
            expect(response.body[0].productAttributes[0].values[0]._id).to.be.not.null
            expect(response.body[0].productAttributes[0].values[0].code).to.equal(attributesValuesCodeCluster)
            expect(response.body[0].productAttributes[0].values[0].value).to.equal(attributesValuesValueCluster)
            expect(response.body[0].productDescription).to.be.equal(descriptionCluster)
            expect(response.body[0].productId).to.be.equal(clusterId)
            expect(response.body[0].productName).to.be.equal(nameCluster)
            expect(response.body[0].productSlug).to.be.equal(slugCluster)
            expect(response.body[0].slug).to.be.equal(slugSku)
            expect(response.body[0].tags[0]).to.equal(tagsSku)
            expect(response.body[0].thumbnail.sort).to.be.equal(imageSortSku)
            expect(response.body[0].thumbnail.ext).to.be.equal(imageExtSku)
            expect(response.body[0].thumbnail.path).to.be.equal(imagePathSku)
            expect(response.body[0].type).to.equal(typeSku)
            expect(response.body[0].video[0].type).to.be.equal(videoTypeSku)
            expect(response.body[0].video[0].url).to.be.equal(videoUrlSku)

        })
    })

    it('Validate Offer - New offer created', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId = Cypress.env("sellerSkuId")
        let offerPriceVariant = Cypress.env("offerPriceVariant")
        let offerOriginalPriceVariant = Cypress.env("offerOriginalPriceVariant")
        let offerQuantityVariant = Cypress.env("offerQuantityVariant")
        let storeIdSuggestion = Cypress.env("storeIdSuggestion")
        let skuId = Cypress.env("skuId")
        let offerOptionsRefVariant = Cypress.env("offerOptionsRefVariant")
        let offerOptionsNameVariant = Cypress.env("offerOptionsNameVariant")
        let offerOptionsPriceVariant = Cypress.env("offerOptionsPriceVariant")
      //let limitPurchaseVariantOffer = Cypress.env('limitPurchaseVariantOffer')   

        cy.api_getOffersByRef(sellerSkuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].available).to.be.equal(true)
            expect(response.body[0].offer.price).to.be.equal(offerPriceVariant)
            expect(response.body[0].offer.originalPrice).to.be.equal(offerOriginalPriceVariant)
            expect(response.body[0].offer.isActive).to.be.equal(true)
            expect(response.body[0].offer.stockBalance).to.be.equal(offerQuantityVariant)
            expect(response.body[0].offer.sellerSkuId).to.be.equal(sellerSkuId)
            expect(response.body[0].offer.storeId).to.be.equal(storeIdSuggestion)
            expect(response.body[0].offer.skuId).to.be.equal(skuId)
            expect(response.body[0].offer.options[0]._id).to.be.not.null            
            expect(response.body[0].offer.options[0].ref).to.be.equal(offerOptionsRefVariant)
            expect(response.body[0].offer.options[0].name).to.be.equal(offerOptionsNameVariant)
            expect(response.body[0].offer.options[0].price).to.be.equal(offerOptionsPriceVariant)
            //expect(response.body[0].offer.stocks.XXXXX.total).to.be.equal(offerQuantityVariant)
            //expect(response.body[0].offer.stocks.XXXXX.balance).to.be.equal(offerQuantityVariant)]
            //expect(response.body[0].offer.stocks.XXXXX.reserved).to.be.equal(0)
            //expect(response.body[0].offer.limitPurchase).to.be.equal(limitPurchaseVariantOffer)         
        })
    })
})

describe('Process Suggestion (1 variant) - MATCH Sku NOT Published', () => {

    it('Create Sku / Cluster', () => {
        cy.api_generateClientTokenDevAdmin()    

        cy.api_createCluster().then((response) => {
            Cypress.env('clusterIdNotPublished', response.body._id)
            })

            cy.api_createSku().then((response) => {
            Cypress.env('skuIdNotPublished', response.body._id)
            })
    })

    it('Create New Suggestion', () => {
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Proccess Suggestion MATCH with Sku NOT Published', () => {

        let skuIdNotPublished = Cypress.env("skuIdNotPublished")
        let clusterIdNotPublished = Cypress.env("clusterIdNotPublished")
        let suggestionId = Cypress.env("suggestionId")
        let sellerSkuId = Cypress.env("sellerSkuId")

        cy.api_generateClientTokenDevAdmin()
  
        cy.api_processSuggestionMATCH(skuIdNotPublished, clusterIdNotPublished,sellerSkuId)
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Match successfully done. Publish SKU " + skuIdNotPublished + " to create an offer.")
        }) 
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.contains("MATCH")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.contains("MATCH")
            expect(response.body._id).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.equal(skuIdNotPublished)
            Cypress.env('skuId', response.body.variants[0].sku._id)
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.cluster._id).to.be.equal(clusterIdNotPublished)
            Cypress.env('clusterId', response.body.cluster._id)
        })

    })

    it('Validate Offer - New offer created', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId = Cypress.env("sellerSkuId")
        
        cy.api_getOffersByRef(sellerSkuId).then((response) => {
            expect(response.status).to.equal(200)          
            var array = response.body
            if (array.length === 0) {
                cy.log("Não criou offer")
            }

        })
    })
})

describe('Process Suggestion (2 variants) - MATCH Sku 1 Published and After, MATCH Sku 2 Not Published', () => {

    it('Create Sku / Cluster for MATCH', () => {
        cy.api_generateClientTokenDevAdmin()       

        cy.api_createCluster().then((response) => {
            Cypress.env('clusterIdPublished', response.body._id)
            })

            cy.api_createSku().then((response) => {
            Cypress.env('skuIdPublished', response.body._id)
            })
    })

    it('Publish Sku / Cluster', () => {

        let skuIdPublished = Cypress.env('skuIdPublished')
        let clusterIdPublished = Cypress.env('clusterIdPublished')

        cy.api_publishSku(skuIdPublished).then((response) => {
            expect(response.status).to.equal(202)
            expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(5000)

        cy.api_publishCluster(clusterIdPublished).then((response) => {
            expect(response.status).to.equal(202)
            expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(5000)
        cy.log("Validate Sku - isPublished and lastPublish")
        cy.api_getSkuById(skuIdPublished).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null
        })
    })

    it('Create New Suggestion', () => {
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion2Variants()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Proccess Suggestion MATCH with SKU 1 Published', () => {

        let skuIdPublished = Cypress.env("skuIdPublished")
        let clusterIdPublished = Cypress.env("clusterIdPublished")
        let suggestionId = Cypress.env("suggestionId")
        let sellerSkuId = Cypress.env("sellerSkuId")

        cy.api_generateClientTokenDevAdmin()
   
        cy.api_processSuggestionMATCH(skuIdPublished, clusterIdPublished,sellerSkuId)
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Match successfully done. An offer to SKU " + skuIdPublished + " will be processed.")
        })
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("PENDING")
            expect(response.body.type).to.contains("MATCH")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.contains("MATCH")
            expect(response.body.variants[1].status).to.equal("PENDING")
            expect(response.body.variants[0].type).to.contains("MATCH")
            expect(response.body._id).to.be.not.null
            expect(response.body.variants[0].sellerSkuId).to.be.equal(sellerSkuId)
            expect(response.body.variants[0].sku._id).to.be.equal(skuIdPublished)
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdPublished)
            expect(response.body.cluster._id).to.be.equal(clusterIdPublished)
        })
    })

    it('Validate Offer - New offer created', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId = Cypress.env("sellerSkuId")
        let offerPriceVariant = Cypress.env("offerPriceVariant")
        let offerOriginalPriceVariant = Cypress.env("offerOriginalPriceVariant")
        let offerQuantityVariant = Cypress.env("offerQuantityVariant")
        //let limitPurchaseVariantOffer = Cypress.env('limitPurchaseVariantOffer')   

        cy.api_getOffersByRef(sellerSkuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].offer.sellerSkuId).to.be.not.null
            expect(response.body[0].offer.price).to.be.equal(offerPriceVariant)
            expect(response.body[0].offer.originalPrice).to.be.equal(offerOriginalPriceVariant)
            expect(response.body[0].offer.stockBalance).to.be.equal(offerQuantityVariant)
            //expect(response.body[0].offer.limitPurchase).to.be.equal(limitPurchaseVariantOffer)

        })
    })

    it('Create Sku / Cluster', () => {
      
            cy.api_createCluster().then((response) => {
            Cypress.env('clusterIdNotPublished', response.body._id)
            })

            cy.api_createSku().then((response) => {
            Cypress.env('skuIdNotPublished', response.body._id)
            })
    })

    it('Proccess Suggestion MATCH with Sku 2 NOT Published', () => {

        let skuIdNotPublished = Cypress.env("skuIdNotPublished")
        let clusterIdNotPublished = Cypress.env("clusterIdNotPublished")
        let clusterIdPublished = Cypress.env("clusterIdPublished")
        let suggestionId = Cypress.env("suggestionId")
        let sellerSkuId1 = Cypress.env("sellerSkuId1")

        cy.api_generateClientTokenDevAdmin()
      
        cy.api_processSuggestionMATCH(skuIdNotPublished, clusterIdNotPublished, sellerSkuId1)
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Match successfully done. Publish SKU " + skuIdNotPublished + " to create an offer.")
        }) 
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.contains("MATCH")
            expect(response.body._id).to.be.not.null
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.contains("MATCH")
            expect(response.body.variants[1].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].type).to.contains("MATCH")
            expect(response.body.variants[1].sellerSkuId).to.be.equal(sellerSkuId1)
            expect(response.body.variants[1].sku._id).to.be.equal(skuIdNotPublished)
            expect(response.body.variants[1].sku.clusterId).to.be.equal(clusterIdNotPublished)
            expect(response.body.cluster._id).to.be.equal(clusterIdPublished) //cluster continua com o cluster da outra variant
        })

    })

    it('Validate Offer - Offer Sku 2 Not created', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId1 = Cypress.env("sellerSkuId1")
        
        cy.api_getOffersByRef(sellerSkuId1).then((response) => {
            expect(response.status).to.equal(200)
            var array = response.body
            if (array.length === 0) {
                cy.log("Não criou offer")
            }

        })
    })
})
