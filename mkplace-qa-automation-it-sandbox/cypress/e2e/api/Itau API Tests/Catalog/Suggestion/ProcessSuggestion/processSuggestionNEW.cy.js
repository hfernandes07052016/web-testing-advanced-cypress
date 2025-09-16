
describe.only('Process Suggestion NEW - 1 Variant', () => {
  
    it('Create Suggestion', () => {

        let typeSuggestion = "suggestion-new"

        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant(typeSuggestion)
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Validating Suggestion after Automatic Processing', () => {
            
        let suggestionId = Cypress.env("suggestionId")

        cy.api_getSuggestionById(suggestionId).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body._id).to.be.equal(suggestionId)
        expect(response.body.status).to.equal("PENDING")
        expect(response.body.variants[0].sellerSkuId).to.be.not.null 
        expect(response.body.variants[0].status).to.equal("PENDING")
        })

    })

    it('Process Suggestion NEW', () => {

        let suggestionId = Cypress.env('suggestionId')

        cy.api_generateClientTokenDevAdmin()
       
        cy.api_processSuggestionNEW().then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        }),
        cy.wait(20000)

        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body._id).to.be.equal(suggestionId)
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.not.null
            Cypress.env('skuId', response.body.variants[0].sku._id)
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('clusterId', response.body.cluster._id)
        })
    })

    it('Validate Report Logs NEW', () => {      
        
        let suggestionId = Cypress.env("suggestionId")
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            expect(response.body.docs[1].response.message).to.be.equal("SKU with ID \'" + skuId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[2].response.message).to.be.equal("Cluster with ID \'" + clusterId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.total).to.be.equal(3) //garantir que não criou mais nada
        })
    })

    it('Validate created Cluster', () => {

        let clusterId = Cypress.env('clusterId')
        let brandSuggestion = Cypress.env('brandSuggestion')       
        let nameSuggestion = Cypress.env('nameSuggestion')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let shortDescriptionSuggestion = Cypress.env('shortDescriptionSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
        let metadataSuggestion = Cypress.env('metadataSuggestion')  
        let storeIdSuggestion = Cypress.env('storeIdSuggestion')  

        cy.api_getClusterById(clusterId).then((response) => {
           
            expect(response.status).to.equal(200)
            expect(response.body.brand).to.equal(brandSuggestion)           
            expect(response.body.attributesCodeToShowInName).to.have.length(0)
            expect(response.body.searchableAttributesCode).to.have.length(0)
            expect(response.body.filterableAttributesCode).to.have.length(0)
            expect(response.body.relatedSkuIds).to.have.length(0)
            expect(response.body.isPublished).to.be.equal(false)
            expect(response.body.lastPublish).to.be.null
            expect(response.body.name).to.be.equal(nameSuggestion)
            expect(response.body.description).to.be.equal(descriptionSuggestion)
            expect(response.body.shortDescription).to.be.equal(shortDescriptionSuggestion)
            expect(response.body.attributes[0].required).to.be.equal(false)
            expect(response.body.attributes[0].sort).to.be.equal(0)
            expect(response.body.attributes[0]._id).to.be.not.null
            expect(response.body.attributes[0].name).to.be.equal(attributesNameSuggestion)
            //expect(response.body.attributes[0].code).to.be.equal(attributesNameSuggestion)
            expect(response.body.attributes[0].values[0].sort).to.be.equal(0)
            expect(response.body.attributes[0].values[0]._id).to.be.not.null
            //expect(response.body.attributes[0].values[0].code).to.be.equal(attributesValueSuggestion)
            expect(response.body.attributes[0].values[0].value).to.be.equal(attributesValueSuggestion)
            expect(response.body.expandAttributes).to.have.length(0)
            expect(response.body.metadata.metadataSuggestion).to.be.equal(metadataSuggestion)
            expect(response.body.storeId).to.be.equal(storeIdSuggestion)
            expect(response.body.createdAt).to.be.not.null
            expect(response.body.updatedAt).to.be.not.null
            expect(response.body.slug).to.be.not.null
            expect(response.body.__v).to.be.not.null
            Cypress.env('slugCluster', response.body.slug)
        })

    })

    it('Validate created Sku', () => {

        let skuId = Cypress.env('skuId')
        let clusterId = Cypress.env('clusterId')
        let tagsVariant = Cypress.env('tagsVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        let eanVariant = Cypress.env('eanVariant')
        let descriptionVariant = Cypress.env('descriptionVariant')
        let shortDescriptionVariant = Cypress.env('shortDescriptionVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let staticAttributesNameVariant = Cypress.env('staticAttributesNameVariant')
        let staticAttributesValueVariant = Cypress.env('staticAttributesValueVariant')        
        let dimensionsWeightVariant = Cypress.env('dimensionsWeightVariant')
        let dimensionsWidthVariant = Cypress.env('dimensionsWidthVariant')
        let dimensionsHeightVariant = Cypress.env('dimensionsHeightVariant')
        let dimensionsLengthVariant = Cypress.env('dimensionsLengthVariant')
        let nameVariant = Cypress.env('nameVariant')
        let storeIdSuggestion = Cypress.env('storeIdSuggestion')
        let imageSortVariant = Cypress.env('imageSortVariant')
        let imageExtVariant = Cypress.env('imageExtVariant')
        let videoTypeVariant = Cypress.env('videoTypeVariant')
        let metadataSuggestionVariant = Cypress.env('metadataSuggestionVariant')
                        
        cy.api_getSkuById(skuId).then((response) => {
    
                expect(response.status).to.equal(200)
                expect(response.body.tags[0]).to.be.equal(tagsVariant)
                expect(response.body.categories[0]).to.be.equal(categoriesVariant)
                expect(response.body.siteIds).to.have.length(0)
                expect(response.body.status).to.be.equal("DRAFT")
                expect(response.body.type).to.be.equal(skuTypeVariant)
                expect(response.body.isPublished).to.be.equal(false)
                expect(response.body._id).to.be.equal(skuId)
                expect(response.body.storeId).to.be.equal(storeIdSuggestion)
                expect(response.body.clusterId).to.be.equal(clusterId)
                expect(response.body.ean).to.be.equal(eanVariant)
                expect(response.body.name).to.be.equal(nameVariant)
                expect(response.body.description).to.be.equal(descriptionVariant)
                expect(response.body.shortDescription).to.be.equal(shortDescriptionVariant)
                expect(response.body.attributes[0].required).to.be.equal(false)
                expect(response.body.attributes[0].sort).to.be.equal(0)
                expect(response.body.attributes[0]._id).to.be.not.null
                expect(response.body.attributes[0].name).to.be.equal(attributesNameVariant)
                //expect(response.body.attributes[0].code).to.be.equal(attributesCodeSku)
                expect(response.body.attributes[0].values[0].sort).to.be.equal(0)
                expect(response.body.attributes[0].values[0]._id).to.be.not.null
                //expect(response.body.attributes[0].values[0].code).to.be.equal(attributesValuesCodeSku)
                expect(response.body.attributes[0].values[0].value).to.be.equal(attributesValueVariant)
                expect(response.body.staticAttributes[0].required).to.be.equal(false)
                expect(response.body.staticAttributes[0].sort).to.be.equal(0)
                expect(response.body.staticAttributes[0]._id).to.be.not.null
                expect(response.body.staticAttributes[0].name).to.be.equal(staticAttributesNameVariant)
                //expect(response.body.staticAttributes[0].code).to.be.equal(staticAttributesCodeSku)
                expect(response.body.staticAttributes[0].values[0].sort).to.be.equal(0)
                expect(response.body.staticAttributes[0].values[0]._id).to.be.not.null
                //expect(response.body.staticAttributes[0].values[0].code).to.be.equal(staticAttributesValuesCodeSku)
                expect(response.body.staticAttributes[0].values[0].value).to.be.equal(staticAttributesValueVariant)
                expect(response.body.images[0].sort).to.be.equal(imageSortVariant)
                expect(response.body.images[0].ext).to.be.equal(imageExtVariant)
                expect(response.body.images[0].path).to.be.not.null // não da pra validar com o payload - a url muda porque vai para a aws
                expect(response.body.video[0].type).to.be.equal(videoTypeVariant)
                expect(response.body.video[0].url).to.be.not.null // não da pra validar com o payload - a url muda porque vai para a aws
                expect(response.body.metadata.metadataSuggestionVariant).to.be.equal(metadataSuggestionVariant)
                expect(response.body.dimensions.weight).to.be.equal(dimensionsWeightVariant)
                expect(response.body.dimensions.width).to.be.equal(dimensionsWidthVariant)
                expect(response.body.dimensions.height).to.be.equal(dimensionsHeightVariant)
                expect(response.body.dimensions.length).to.be.equal(dimensionsLengthVariant)
                expect(response.body.reviews).to.have.length(0)
                expect(response.body.createdAt).to.be.not.null
                expect(response.body.updatedAt).to.be.not.null
                expect(response.body.slug).to.be.not.null
                expect(response.body.__v).to.be.not.null
                Cypress.env('slugSku', response.body.slug)
                Cypress.env("imagePathSku", response.body.images[0].path)
                Cypress.env("videoUrlSku", response.body.video[0].url)

        })
    })

    it('Publish Sku and Cluster', () => {
     
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.log("Publish Sku")
        cy.api_publishSku(skuId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("SKU with ID " + skuId + " ready to be published. Publish your Cluster with ID " + clusterId + " to create a Product.")
        })
        cy.log("Publish Cluster")
        cy.api_publishCluster(clusterId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Message successfully processed.")
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            expect(response.body.docs[1].response.message).to.equal("Cluster with ID " + clusterId + " successfully published. Product has been created with ID " + clusterId + ".")
        })
        cy.log("Validating Publish Sku")
        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })
        cy.log("Validating Publish Cluster")
        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })

    })

    it('Validate Product (Variants by Id List) - Product created', () => {

        let skuId = Cypress.env('skuId')
        let slugSku = Cypress.env('slugSku')
        let storeIdSuggestion = Cypress.env('storeIdSuggestion')
        let slugCluster = Cypress.env('slugCluster')
        let tagsVariant = Cypress.env('tagsVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        let eanVariant = Cypress.env('eanVariant')
        let descriptionVariant = Cypress.env('descriptionVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let staticAttributesNameVariant = Cypress.env('staticAttributesNameVariant')
        let staticAttributesValueVariant = Cypress.env('staticAttributesValueVariant')
        let brandSuggestion = Cypress.env('brandSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let nameVariant = Cypress.env('nameVariant')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let clusterId = Cypress.env("clusterId")
        let imageSortVariant = Cypress.env('imageSortVariant')
        let imageExtVariant = Cypress.env('imageExtVariant')
        let imagePathSku = Cypress.env('imagePathSku')
        let metadataSuggestionVariant = Cypress.env('metadataSuggestionVariant')
        let videoTypeVariant = Cypress.env('videoTypeVariant')
        let videoUrlSku = Cypress.env('videoUrlSku')
               

        cy.api_getVariantsbyIdList(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].storeId).to.equal(storeIdSuggestion)
            expect(response.body[0].skuId).to.be.equal(skuId)            
            expect(response.body[0].attributes[0].required).to.equal(false)
            expect(response.body[0].attributes[0].sort).to.equal(0)            
            expect(response.body[0].attributes[0].name).to.equal(attributesNameVariant)
            //expect(response.body[0].attributes[0].code).to.equal(attributesCodeSku)
            expect(response.body[0].attributes[0].values[0].sort).to.equal(0)
            //expect(response.body[0].attributes[0].values[0].code).to.equal(attributesValuesCodeSku)
            expect(response.body[0].attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body[0].staticAttributes[0].required).to.equal(false)
            expect(response.body[0].staticAttributes[0].sort).to.equal(0)            
            expect(response.body[0].staticAttributes[0].name).to.equal(staticAttributesNameVariant)
            //expect(response.body[0].staticAttributes[0].code).to.equal(staticAttributesCodeSku)
            expect(response.body[0].staticAttributes[0].values[0].sort).to.equal(0)
            //expect(response.body[0].staticAttributes[0].values[0].code).to.equal(staticAttributesValuesCodeSku)
            expect(response.body[0].staticAttributes[0].values[0].value).to.equal(staticAttributesValueVariant)
            expect(response.body[0].brand).to.equal(brandSuggestion)
            expect(response.body[0].categories[0]).to.equal(categoriesVariant)
            expect(response.body[0].collections).to.have.length(0)
            expect(response.body[0].description).to.equal(descriptionVariant)
            expect(response.body[0].ean).to.equal(eanVariant)
            expect(response.body[0].images[0].sort).to.be.equal(imageSortVariant)
            expect(response.body[0].images[0].ext).to.be.equal(imageExtVariant)
            expect(response.body[0].images[0].path).to.be.equal(imagePathSku)
            expect(response.body[0].metadata.metadataSuggestionVariant).to.be.equal(metadataSuggestionVariant)
            expect(response.body[0].name).to.be.equal(nameVariant)
            expect(response.body[0].productAttributes[0].required).to.equal(false)
            expect(response.body[0].productAttributes[0].sort).to.equal(0)            
            expect(response.body[0].productAttributes[0]._id).to.be.not.null
            expect(response.body[0].productAttributes[0].name).to.equal(attributesNameSuggestion)
            //expect(response.body[0].productAttributes[0].code).to.equal(attributesCodeCluster)
            expect(response.body[0].productAttributes[0].values[0].sort).to.equal(0)
            expect(response.body[0].productAttributes[0].values[0]._id).to.be.not.null
            //expect(response.body[0].productAttributes[0].values[0].code).to.equal(attributesValuesCodeCluster)
            expect(response.body[0].productAttributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body[0].productDescription).to.be.equal(descriptionSuggestion)
            expect(response.body[0].productId).to.be.equal(clusterId)
            expect(response.body[0].productName).to.be.equal(nameSuggestion)
            expect(response.body[0].productSlug).to.be.equal(slugCluster)
            expect(response.body[0].slug).to.be.equal(slugSku)
            expect(response.body[0].tags[0]).to.equal(tagsVariant)
            expect(response.body[0].thumbnail.sort).to.be.equal(imageSortVariant)
            expect(response.body[0].thumbnail.ext).to.be.equal(imageExtVariant)
            expect(response.body[0].thumbnail.path).to.be.equal(imagePathSku)
            expect(response.body[0].type).to.equal(skuTypeVariant)
            expect(response.body[0].video[0].type).to.be.equal(videoTypeVariant)
            expect(response.body[0].video[0].url).to.be.equal(videoUrlSku)
        })
    })

    it('Validate Product (Variants by Slug) - Product created', () => {

        let categoriesVariant = Cypress.env('categoriesVariant')
        let searchableAttributesCodeSuggestion = Cypress.env('searchableAttributesCodeSuggestion')
        let filterableAttributesCodeSuggestion = Cypress.env('filterableAttributesCodeSuggestion')        
        let relatedSkuIdsSuggestion = Cypress.env('relatedSkuIdsSuggestion')        
        let clusterId = Cypress.env("clusterId")
        let storeIdSuggestion = Cypress.env('storeIdSuggestion')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let slugCluster = Cypress.env('slugCluster')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')    
        let shortDescriptionSuggestion = Cypress.env('shortDescriptionSuggestion')    
        let brandSuggestion = Cypress.env('brandSuggestion')
        let tagsVariant = Cypress.env('tagsVariant')
        let sitesIdVariant = Cypress.env('sitesIdVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')        
        let skuId = Cypress.env('skuId')
        let nameVariant = Cypress.env('nameVariant')
        let slugSku = Cypress.env('slugSku')
        let descriptionVariant = Cypress.env('descriptionVariant')
        let shortDescriptionVariant = Cypress.env('shortDescriptionVariant')
        let eanVariant = Cypress.env('eanVariant')
        let dimensionsWeightVariant = Cypress.env('dimensionsWeightVariant')
        let dimensionsWidthVariant = Cypress.env('dimensionsWidthVariant')
        let dimensionsHeightVariant = Cypress.env('dimensionsHeightVariant')
        let dimensionsLengthVariant = Cypress.env('dimensionsLengthVariant')
        let imageSortVariant = Cypress.env('imageSortVariant')
        let imageExtVariant = Cypress.env('imageExtVariant')
        let imagePathSku = Cypress.env('imagePathSku')
        let videoTypeVariant = Cypress.env('videoTypeVariant')
        let videoUrlSku = Cypress.env('videoUrlSku')
        let metadataVariant = Cypress.env('metadataVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let staticAttributesNameVariant = Cypress.env('staticAttributesNameVariant')
        let staticAttributesValueVariant = Cypress.env('staticAttributesValueVariant')     
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion') 
   
        
        cy.api_getVariantsbySlug(slugSku).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.categories[0]).to.be.equal(categoriesVariant)
            //expect(response.body.searchableAttributesCode[0]).to.be.equal(searchableAttributesCodeCluster)
            //expect(response.body.filterableAttributesCode[0]).to.be.equal(filterableAttributesCodeCluster)
            //expect(response.body.relatedSkuIds[0]).to.be.equal(relatedSkuIdsCluster)
            expect(response.body._id).to.be.equal(clusterId)            
            expect(response.body.storeId).to.equal(storeIdSuggestion)
            expect(response.body.name).to.be.equal(nameSuggestion)
            expect(response.body.slug).to.be.equal(slugCluster)            
            expect(response.body.description).to.be.equal(descriptionSuggestion)
            expect(response.body.shortDescription).to.be.equal(shortDescriptionSuggestion)
            expect(response.body.brand).to.equal(brandSuggestion)
            expect(response.body.variants[0].status).to.be.not.null
            expect(response.body.variants[0].tags[0]).to.be.equal(tagsVariant)
            //expect(response.body.variants[0].siteIds[0]).to.be.equal(sitesIdVariant)
            expect(response.body.variants[0].type).to.be.equal(skuTypeVariant)
            expect(response.body.variants[0].delete).to.be.equal(false) // o q é isso?
            expect(response.body.variants[0]._id).to.be.equal(skuId)
            expect(response.body.variants[0].name).to.be.equal(nameVariant)
            expect(response.body.variants[0].slug).to.be.equal(slugSku)
            expect(response.body.variants[0].description).to.be.equal(descriptionVariant)
            expect(response.body.variants[0].shortDescription).to.be.equal(shortDescriptionVariant)
            expect(response.body.variants[0].ean).to.be.equal(eanVariant)
            expect(response.body.variants[0].dimensions.weight).to.be.equal(dimensionsWeightVariant)
            expect(response.body.variants[0].dimensions.width).to.be.equal(dimensionsWidthVariant)
            expect(response.body.variants[0].dimensions.height).to.be.equal(dimensionsHeightVariant)
            expect(response.body.variants[0].dimensions.length).to.be.equal(dimensionsLengthVariant)
            expect(response.body.variants[0].images[0].sort).to.be.equal(imageSortVariant)
            expect(response.body.variants[0].images[0].ext).to.be.equal(imageExtVariant)
            expect(response.body.variants[0].images[0].path).to.be.equal(imagePathSku)
            expect(response.body.variants[0].video[0].type).to.be.equal(videoTypeVariant)
            expect(response.body.variants[0].video[0].url).to.be.equal(videoUrlSku)            
            expect(response.body.variants[0].metadata.metadataVariant).to.be.equal(metadataVariant)
            expect(response.body.variants[0].attributes[0].required).to.equal(false)
            expect(response.body.variants[0].attributes[0].sort).to.equal(0)            
            expect(response.body.variants[0].attributes[0].name).to.equal(attributesNameVariant)
            //expect(response.body.variants[0].attributes[0].code).to.equal(attributesCodeVariant)
            expect(response.body.variants[0].attributes[0].values[0].sort).to.equal(0)
            //expect(response.body.variants[0].attributes[0].values[0].code).to.equal(attributesCodeVariant)
            expect(response.body.variants[0].attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body.variants[0].staticAttributes[0].required).to.equal(false)
            expect(response.body.variants[0].staticAttributes[0].sort).to.equal(0)            
            expect(response.body.variants[0].staticAttributes[0].name).to.equal(staticAttributesNameVariant)
            //expect(response.body.variants[0].staticAttributes[0].code).to.equal(staticAttributesCodeVariant)
            expect(response.body.variants[0].staticAttributes[0].values[0].sort).to.equal(0)
            //expect(response.body.variants[0].staticAttributes[0].values[0].code).to.equal(staticAttributesCodeVariant)
            expect(response.body.variants[0].staticAttributes[0].values[0].value).to.equal(staticAttributesValueVariant)
            expect(response.body.variants[0].collections).to.have.length(0)
            expect(response.body.variants[0].createdAt).to.be.not.null
            expect(response.body.variants[0].updatedAt).to.be.not.null
            //expect(response.body.variants[0].verifyToken).to.be.null
            expect(response.body.variants[0].id).to.be.equal(skuId) // 2x?            
            expect(response.body.attributes[0].required).to.equal(false)
            expect(response.body.attributes[0].sort).to.equal(0)            
            expect(response.body.attributes[0]._id).to.be.not.null
            expect(response.body.attributes[0].name).to.equal(attributesNameSuggestion)
            //expect(response.body.attributes[0].code).to.equal(attributesCodeSuggestion)
            expect(response.body.attributes[0].values[0].sort).to.equal(0)
            expect(response.body.attributes[0].values[0]._id).to.be.not.null
            //expect(response.body.attributes[0].values[0].code).to.equal(attributesCodeSuggestion)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body.possibleAttributes[0].required).to.equal(false)
            expect(response.body.possibleAttributes[0].sort).to.equal(0)            
            expect(response.body.possibleAttributes[0].name).to.equal(attributesNameVariant)
            //expect(response.body.possibleAttributes[0].code).to.equal(attributesCodeVariant)
            expect(response.body.possibleAttributes[0].values[0].sort).to.equal(0)
            //expect(response.body.possibleAttributes[0].values[0].code).to.equal(attributesCodeVariant)
            expect(response.body.possibleAttributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body.reviews).to.have.length(0)               
            expect(response.body.images).to.have.length(0)            
            expect(response.body.expandAttributes).to.have.length(0)
            expect(response.body.createdAt).to.be.not.null
            expect(response.body.updatedAt).to.be.not.null           
        })
    })

    it('Validate Offer - Offer created', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId = Cypress.env("sellerSkuId")
        let offerPriceVariant = Cypress.env("offerPriceVariant")
        let offerOriginalPriceVariant = Cypress.env("offerOriginalPriceVariant")
        let offerQuantityVariant = Cypress.env("offerQuantityVariant")
        let offerMetadataVariant = Cypress.env("offerMetadataVariant")
        //let limitPurchaseVariantOffer = Cypress.env('limitPurchaseVariantOffer')   


        cy.api_getOffersByRef(sellerSkuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].offer.sellerSkuId).to.be.not.null
            expect(response.body[0].offer.price).to.be.equal(offerPriceVariant)
            expect(response.body[0].offer.originalPrice).to.be.equal(offerOriginalPriceVariant)
            expect(response.body[0].offer.stockBalance).to.be.equal(offerQuantityVariant)
            expect(response.body[0].offer.metadata.metadataOffer).to.be.equal(offerMetadataVariant)
            //expect(response.body[0].offer.limitPurchase).to.be.equal(limitPurchaseVariantOffer)

        })
    })  
})

describe('Process Suggestion (Minimal fields) NEW - 1 Variant', () => {
  
    it('Create Suggestion', () => {
        
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestionMinimalFieldsProcess()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Validating Suggestion after Automatic Processing', () => {
            
        let suggestionId = Cypress.env("suggestionId")

        cy.api_getSuggestionById(suggestionId).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body._id).to.be.equal(suggestionId)
        expect(response.body.status).to.equal("PENDING")
        expect(response.body.variants[0].sellerSkuId).to.be.not.null 
        expect(response.body.variants[0].status).to.equal("PENDING")
        })
    })

    it('Process Suggestion NEW', () => {

        let suggestionId = Cypress.env('suggestionId')

        cy.api_generateClientTokenDevAdmin()
       
        cy.api_processSuggestionNEW().then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        }),
        cy.wait(20000)

        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body._id).to.be.equal(suggestionId)
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.not.null
            Cypress.env('skuId', response.body.variants[0].sku._id)
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('clusterId', response.body.cluster._id)
        })
    })

    it('Validate Report Logs NEW', () => {      
        
        let suggestionId = Cypress.env("suggestionId")
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            expect(response.body.docs[1].response.message).to.be.equal("SKU with ID \'" + skuId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[2].response.message).to.be.equal("Cluster with ID \'" + clusterId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.total).to.be.equal(3) //garantir que não criou mais nada
        })
    })

    it('Validate created Cluster', () => {

        let clusterId = Cypress.env('clusterId')
        let nameSuggestion = Cypress.env('nameSuggestion')
    
        cy.api_getClusterById(clusterId).then((response) => {
           
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.be.equal(false)
            expect(response.body.lastPublish).to.be.null
            expect(response.body.name).to.be.equal(nameSuggestion)
            expect(response.body.createdAt).to.be.not.null
            expect(response.body.updatedAt).to.be.not.null
            expect(response.body.slug).to.be.not.null
            expect(response.body.__v).to.be.not.null
            Cypress.env('slugCluster', response.body.slug)
        })
    })

    it('Validate created Sku', () => {

        let skuId = Cypress.env('skuId')
        let clusterId = Cypress.env('clusterId')
                        
        cy.api_getSkuById(skuId).then((response) => {
    
                expect(response.status).to.equal(200)
                expect(response.body.status).to.be.equal("DRAFT")
                expect(response.body._id).to.be.equal(skuId)
                expect(response.body.clusterId).to.be.equal(clusterId)
                expect(response.body.createdAt).to.be.not.null
                expect(response.body.updatedAt).to.be.not.null
                expect(response.body.slug).to.be.not.null
                expect(response.body.__v).to.be.not.null
                Cypress.env('slugSku', response.body.slug)
        })
    })

    it('Publish Sku and Cluster', () => {
     
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.log("Publish Sku")
        cy.api_publishSku(skuId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("SKU with ID " + skuId + " ready to be published. Publish your Cluster with ID " + clusterId + " to create a Product.")
        })
        cy.log("Publish Cluster")
        cy.api_publishCluster(clusterId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Message successfully processed.")
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            expect(response.body.docs[1].response.message).to.equal("Cluster with ID " + clusterId + " successfully published. Product has been created with ID " + clusterId + ".")
        })
        cy.log("Validating Publish Sku")
        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null
        })
        cy.log("Validating Publish Cluster")
        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null
        })
    })

    it('Validate Product (Variants by Id List)', () => {

        let skuId = Cypress.env('skuId')
        let slugSku = Cypress.env('slugSku')
        let slugCluster = Cypress.env('slugCluster')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let clusterId = Cypress.env("clusterId")

        cy.api_getVariantsbyIdList(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].skuId).to.be.equal(skuId)            
            expect(response.body[0].productId).to.be.equal(clusterId)
            expect(response.body[0].productName).to.be.equal(nameSuggestion)
            expect(response.body[0].productSlug).to.be.equal(slugCluster)
            expect(response.body[0].slug).to.be.equal(slugSku)
        })
    })

    it('Validate Offer', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId = Cypress.env("sellerSkuId")
        let offerPriceVariant = Cypress.env("offerPriceVariant")
        let offerOriginalPriceVariant = Cypress.env("offerOriginalPriceVariant")
        let offerQuantityVariant = Cypress.env("offerQuantityVariant")

        cy.api_getOffersByRef(sellerSkuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].offer.sellerSkuId).to.be.not.null
            //expect(response.body[0].offer.price).to.be.equal(offerPriceVariant)
            //expect(response.body[0].offer.originalPrice).to.be.equal(offerOriginalPriceVariant)
            //expect(response.body[0].offer.stockBalance).to.be.equal(offerQuantityVariant)
        })
    })  
})

describe('Process Suggestion NEW - 2 Variants', () => {

    it('Create Suggestion', () => {
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion2Variants()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Process Suggestion NEW', () => {

        let suggestionId = Cypress.env('suggestionId')

        cy.api_generateClientTokenDevAdmin()
      
        cy.api_processSuggestionNEW().then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        }),
        cy.wait(20000)
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")
            //Variant 1
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.not.null
            Cypress.env('skuId', response.body.variants[0].sku._id)
            //Variant 2
            expect(response.body.variants[1].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].type).to.equal("NEW")
            expect(response.body.variants[1].sku._id).to.be.not.null
            Cypress.env('skuId1', response.body.variants[1].sku._id)
                      
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('clusterId', response.body.cluster._id)

                                  
        })
    })

    it('Validate Report Logs NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
        let skuId = Cypress.env("skuId")
        let skuId1 = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            //o reportlog as vezes muda a ordem sku e sku1
            //expect(response.body.docs[0].response.message).to.be.equal("SKU with ID \'" + skuId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            expect(response.body.docs[1].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            expect(response.body.docs[2].status).to.equal("SUCCESS")
            //expect(response.body.docs[2].response.message).to.be.equal("SKU with ID \'" + skuId1 + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[3].status).to.equal("SUCCESS")
            expect(response.body.docs[3].response.message).to.be.equal("Cluster with ID \'" + clusterId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.total).to.be.equal(4) //garantir que não criou mais nada
        })
    })

    it('Validate created Cluster', () => {

        let clusterId = Cypress.env('clusterId')
        let brandSuggestion = Cypress.env('brandSuggestion')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let shortDescriptionSuggestion = Cypress.env('shortDescriptionSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')

        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.brand).to.equal(brandSuggestion)
            expect(response.body.name).to.equal(nameSuggestion)
            expect(response.body.description).to.equal(descriptionSuggestion)
            expect(response.body.shortDescription).to.equal(shortDescriptionSuggestion)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body.attributes[0].name).to.equal(attributesNameSuggestion)
            Cypress.env('slugCluster', response.body.slug)
        })

    })

    it('Validate created Sku 1', () => {

        let skuId = Cypress.env('skuId')
        let tagsVariant = Cypress.env('tagsVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        let eanVariant = Cypress.env('eanVariant')
        let descriptionVariant = Cypress.env('descriptionVariant')
        let shortDescriptionVariant = Cypress.env('shortDescriptionVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let dimensionsWeightVariant = Cypress.env('dimensionsWeightVariant')
        let dimensionsWidthVariant = Cypress.env('dimensionsWidthVariant')
        let dimensionsHeightVariant = Cypress.env('dimensionsHeightVariant')
        let dimensionsLengthVariant = Cypress.env('dimensionsLengthVariant')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let nameVariant = Cypress.env('nameVariant')

        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.tags[0]).to.equal(tagsVariant)
            expect(response.body.categories[0]).to.equal(categoriesVariant)
            expect(response.body.type).to.equal(skuTypeVariant)
            expect(response.body.ean).to.equal(eanVariant)
            expect(response.body.description).to.equal(descriptionVariant)
            expect(response.body.shortDescription).to.equal(shortDescriptionVariant)
            expect(response.body.attributes[0].name).to.equal(attributesNameVariant)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body.dimensions.weight).to.equal(dimensionsWeightVariant)
            expect(response.body.dimensions.width).to.equal(dimensionsWidthVariant)
            expect(response.body.dimensions.height).to.equal(dimensionsHeightVariant)
            expect(response.body.dimensions.length).to.equal(dimensionsLengthVariant)
            expect(response.body.name).to.be.equal(nameVariant)
            Cypress.env('slugSku', response.body.slug)
            Cypress.env("imageSortSku", response.body.images[0].sort)
            Cypress.env("imageExtSku", response.body.images[0].ext)
            Cypress.env("imagePathSku", response.body.images[0].path)
        })
    })

    it('Validate created Sku 2', () => {

        let skuId1 = Cypress.env('skuId1')
        let tagsVariant1 = Cypress.env('tagsVariant1')
        let categoriesVariant1 = Cypress.env('categoriesVariant1')
        let skuTypeVariant1 = Cypress.env('skuTypeVariant1')
        let eanVariant1 = Cypress.env('eanVariant1')
        let descriptionVariant1 = Cypress.env('descriptionVariant1')
        let shortDescriptionVariant1 = Cypress.env('shortDescriptionVariant1')
        let attributesNameVariant1 = Cypress.env('attributesNameVariant1')
        let attributesValueVariant1 = Cypress.env('attributesValueVariant1')
        let dimensionsWeightVariant1 = Cypress.env('dimensionsWeightVariant1')
        let dimensionsWidthVariant1 = Cypress.env('dimensionsWidthVariant1')
        let dimensionsHeightVariant1 = Cypress.env('dimensionsHeightVariant1')
        let dimensionsLengthVariant1 = Cypress.env('dimensionsLengthVariant1')
        let nameVariant1 = Cypress.env('nameVariant1')

        cy.api_getSkuById(skuId1).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.tags[0]).to.equal(tagsVariant1)
            expect(response.body.categories[0]).to.equal(categoriesVariant1)
            expect(response.body.type).to.equal(skuTypeVariant1)
            expect(response.body.ean).to.equal(eanVariant1)
            expect(response.body.description).to.equal(descriptionVariant1)
            expect(response.body.shortDescription).to.equal(shortDescriptionVariant1)
            expect(response.body.attributes[0].name).to.equal(attributesNameVariant1)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueVariant1)
            expect(response.body.dimensions.weight).to.equal(dimensionsWeightVariant1)
            expect(response.body.dimensions.width).to.equal(dimensionsWidthVariant1)
            expect(response.body.dimensions.height).to.equal(dimensionsHeightVariant1)
            expect(response.body.dimensions.length).to.equal(dimensionsLengthVariant1)
            expect(response.body.name).to.be.equal(nameVariant1)
            Cypress.env('slugSku1', response.body.slug)
            
        })
    })

    it('Publish Sku 1 and Cluster', () => {
     
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.log("Publish Sku")
        cy.api_publishSku(skuId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("SKU with ID " + skuId + " ready to be published. Publish your Cluster with ID " + clusterId + " to create a Product.")
        })
        cy.log("Publish Cluster")
        cy.api_publishCluster(clusterId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Message successfully processed.")
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            expect(response.body.docs[1].response.message).to.equal("Cluster with ID " + clusterId + " successfully published. Product has been created with ID " + clusterId + ".")
        })
        cy.log("Validating Publish Sku")
        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })
        cy.log("Validating Publish Cluster")
        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })

    })

    it('Validate Product Sku 1 (Variants by Id List)', () => {

        let skuId = Cypress.env('skuId')
        let slugCluster = Cypress.env('slugCluster')
        let slugSku = Cypress.env('slugSku')
        let tagsVariant = Cypress.env('tagsVariant')
        let nameVariant = Cypress.env('nameVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        let eanVariant = Cypress.env('eanVariant')
        let descriptionVariant = Cypress.env('descriptionVariant')
        //let shortDescriptionVariant = Cypress.env('shortDescriptionVariant') VERIFICAR COM ARI
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let brandSuggestion = Cypress.env('brandSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let clusterId = Cypress.env("clusterId")
        let imageSortSku = Cypress.env('imageSortSku')
        let imageExtSku = Cypress.env('imageExtSku')
        let imagePathSku = Cypress.env('imagePathSku')


        cy.api_getVariantsbyIdList(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].skuId).to.be.not.null
            expect(response.body[0].tags[0]).to.equal(tagsVariant)
            expect(response.body[0].categories[0]).to.equal(categoriesVariant)
            expect(response.body[0].type).to.equal(skuTypeVariant)
            expect(response.body[0].ean).to.equal(eanVariant)
            expect(response.body[0].description).to.equal(descriptionVariant)
            // expect(response.body.shortDescription).to.equal(shortDescriptionVariant)
            expect(response.body[0].attributes[0].name).to.equal(attributesNameVariant)
            expect(response.body[0].attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body[0].productAttributes[0].name).to.equal(attributesNameSuggestion)
            expect(response.body[0].productAttributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body[0].brand).to.equal(brandSuggestion)
            expect(response.body[0].name).to.be.equal(nameVariant)
            expect(response.body[0].productDescription).to.be.equal(descriptionSuggestion)
            expect(response.body[0].productId).to.be.equal(clusterId)
            expect(response.body[0].productName).to.be.equal(nameSuggestion)
            expect(response.body[0].productSlug).to.be.equal(slugCluster)
            expect(response.body[0].slug).to.be.equal(slugSku)
            expect(response.body[0].images[0].sort).to.be.equal(imageSortSku)
            expect(response.body[0].images[0].ext).to.be.equal(imageExtSku)
            expect(response.body[0].images[0].path).to.be.equal(imagePathSku)
            expect(response.body[0].thumbnail.sort).to.be.equal(imageSortSku)
            expect(response.body[0].thumbnail.ext).to.be.equal(imageExtSku)
            expect(response.body[0].thumbnail.path).to.be.equal(imagePathSku)

        })
    })

    it('Validate Offer - Offer created for Sku 1', () => {
        
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

    it('Validate Offer - Not offer for Sku 2', () => {
        
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

    it('Publish Sku 2', () => {
     
        let skuId1 = Cypress.env("skuId1")
        let clusterId = Cypress.env("clusterId")
    
        cy.log("Publish Sku")
        cy.api_publishSku(skuId1).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].response.message).to.equal("Message successfully processed.")
            expect(response.body.docs[1].response.message).to.equal("Sku ID " +skuId1+ " successfully published on Product ID " +clusterId)
            })
        cy.log("Validating Publish Sku")
        cy.api_getSkuById(skuId1).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })
     
    })

    it('Validate Offer - Create offer for Sku 2', () => {
        
        cy.wait(10000) // Aguardar o envio para topico Offer

        let sellerSkuId1 = Cypress.env("sellerSkuId1")
        let offerPriceVariant1 = Cypress.env("offerPriceVariant1")
        let offerOriginalPriceVariant1 = Cypress.env("offerOriginalPriceVariant1")
        let offerQuantityVariant1 = Cypress.env("offerQuantityVariant1")
        //let limitPurchaseVariantOffer = Cypress.env('limitPurchaseVariantOffer')   


        cy.api_getOffersByRef(sellerSkuId1).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].offer.sellerSkuId).to.be.not.null
            expect(response.body[0].offer.price).to.be.equal(offerPriceVariant1)
            expect(response.body[0].offer.originalPrice).to.be.equal(offerOriginalPriceVariant1)
            expect(response.body[0].offer.stockBalance).to.be.equal(offerQuantityVariant1)
            //expect(response.body[0].offer.limitPurchase).to.be.equal(limitPurchaseVariantOffer)

        })
    })

})

describe('Process Suggestion NEW - alterando informações', () => {

    it('Create Suggestion', () => {
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Process Suggestion NEW', () => {

        let suggestionId = Cypress.env('suggestionId')

        cy.api_generateClientTokenDevAdmin()
       
        cy.api_processSuggestionNEWcomAlteracao().then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        }),
        cy.wait(20000)
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body._id).to.be.not.null
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.not.null
            Cypress.env('skuId', response.body.variants[0].sku._id)
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('clusterId', response.body.cluster._id)
        })
    })

    it('Validate Report Logs NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            expect(response.body.docs[1].response.message).to.be.equal("SKU with ID \'" + skuId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[2].response.message).to.be.equal("Cluster with ID \'" + clusterId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")

        })
    })

    it('Validate created Cluster', () => {

        let clusterId = Cypress.env('clusterId')
        let brandSuggestion = Cypress.env('brandSuggestion')
        //let nameSuggestion = Cypress.env('nameSuggestion')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let shortDescriptionSuggestion = Cypress.env('shortDescriptionSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
                  
        let nameClusterProcess = "nome cluster alterado no processamento"
        
        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.brand).to.equal(brandSuggestion)
            expect(response.body.name).to.equal(nameClusterProcess)
            expect(response.body.description).to.equal(descriptionSuggestion)
            expect(response.body.shortDescription).to.equal(shortDescriptionSuggestion)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body.attributes[0].name).to.equal(attributesNameSuggestion)
            Cypress.env('slugCluster', response.body.slug)
        })

    })

    it('Validate created Sku', () => {

        let skuId = Cypress.env('skuId')
        let tagsVariant = Cypress.env('tagsVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        //let eanVariant = Cypress.env('eanVariant')
        //let descriptionVariant = Cypress.env('descriptionVariant')
        let shortDescriptionVariant = Cypress.env('shortDescriptionVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let dimensionsWeightVariant = Cypress.env('dimensionsWeightVariant')
        let dimensionsWidthVariant = Cypress.env('dimensionsWidthVariant')
        let dimensionsHeightVariant = Cypress.env('dimensionsHeightVariant')
        let dimensionsLengthVariant = Cypress.env('dimensionsLengthVariant')
        //let nameSuggestion = Cypress.env('nameSuggestion')
        
        let nameVariantProcess = "nome variant alterado no processamento"
        let eanVariantProcess = "eanAlteradoProcessamento"
        let descriptionVariantProcess = "descrição variant alterado no processamento"
           
        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.tags[0]).to.equal(tagsVariant)
            expect(response.body.categories[0]).to.equal(categoriesVariant)
            expect(response.body.type).to.equal(skuTypeVariant)
            expect(response.body.ean).to.equal(eanVariantProcess)
            expect(response.body.description).to.equal(descriptionVariantProcess)
            expect(response.body.shortDescription).to.equal(shortDescriptionVariant)
            expect(response.body.attributes[0].name).to.equal(attributesNameVariant)
            expect(response.body.attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body.dimensions.weight).to.equal(dimensionsWeightVariant)
            expect(response.body.dimensions.width).to.equal(dimensionsWidthVariant)
            expect(response.body.dimensions.height).to.equal(dimensionsHeightVariant)
            expect(response.body.dimensions.length).to.equal(dimensionsLengthVariant)
            //expect(response.body.name).to.be.equal(nameVariantProcess) VERIFICAR COM ARI
            Cypress.env('slugSku', response.body.slug)
            Cypress.env("imageSortSku", response.body.images[0].sort)
            Cypress.env("imageExtSku", response.body.images[0].ext)
            Cypress.env("imagePathSku", response.body.images[0].path)
        })
    })

    it('Publish Sku and Cluster', () => {
     
        let skuId = Cypress.env("skuId")
        let clusterId = Cypress.env("clusterId")

        cy.log("Publish Sku")
        cy.api_publishSku(skuId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("SKU with ID " + skuId + " ready to be published. Publish your Cluster with ID " + clusterId + " to create a Product.")
        })
        cy.log("Publish Cluster")
        cy.api_publishCluster(clusterId).then((response) => {
            expect(response.status).to.equal(202),
                expect(response.body.message).to.be.not.null,
                expect(response.body.reportId).to.be.not.null
        })
        cy.wait(10000)
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.equal("Message successfully processed.")
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            expect(response.body.docs[1].response.message).to.equal("Cluster with ID " + clusterId + " successfully published. Product has been created with ID " + clusterId + ".")
        })
        cy.log("Validating Publish Sku")
        cy.api_getSkuById(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null

        })
        cy.log("Validating Publish Cluster")
        cy.api_getClusterById(clusterId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.isPublished).to.equal(true)
            expect(response.body.lastPublish).to.be.not.null
        })

    })

    it('Validate Product (Variants by Id List)', () => {

        let nameClusterProcess = "nome cluster alterado no processamento"
        let nameVariantProcess = "nome alterado no processamento"
        let descriptionVariantProcess = "descrição variant alterado no processamento"
        let eanVariantProcess = "eanAlteradoProcessamento"
        
        let skuId = Cypress.env('skuId')
        let slugSku = Cypress.env('slugSku')
        let slugCluster = Cypress.env('slugCluster')
        let tagsVariant = Cypress.env('tagsVariant')
        let categoriesVariant = Cypress.env('categoriesVariant')
        let skuTypeVariant = Cypress.env('skuTypeVariant')
        //let eanVariant = Cypress.env('eanVariant')
        //let descriptionVariant = Cypress.env('descriptionVariant')
        let attributesNameVariant = Cypress.env('attributesNameVariant')
        let attributesValueVariant = Cypress.env('attributesValueVariant')
        let brandSuggestion = Cypress.env('brandSuggestion')
        let attributesValueSuggestion = Cypress.env('attributesValueSuggestion')
        let attributesNameSuggestion = Cypress.env('attributesNameSuggestion')
        let nameSuggestion = Cypress.env('nameSuggestion')
        let nameVariant = Cypress.env('nameVariant')
        let descriptionSuggestion = Cypress.env('descriptionSuggestion')
        let clusterId = Cypress.env("clusterId")
        let imageSortSku = Cypress.env('imageSortSku')
        let imageExtSku = Cypress.env('imageExtSku')
        let imagePathSku = Cypress.env('imagePathSku')


        cy.api_getVariantsbyIdList(skuId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body[0].skuId).to.be.not.null
            expect(response.body[0].tags[0]).to.equal(tagsVariant)
            expect(response.body[0].categories[0]).to.equal(categoriesVariant)
            expect(response.body[0].type).to.equal(skuTypeVariant)
            expect(response.body[0].ean).to.equal(eanVariantProcess)
            expect(response.body[0].description).to.equal(descriptionVariantProcess)
            expect(response.body[0].attributes[0].name).to.equal(attributesNameVariant)
            expect(response.body[0].attributes[0].values[0].value).to.equal(attributesValueVariant)
            expect(response.body[0].productAttributes[0].name).to.equal(attributesNameSuggestion)
            expect(response.body[0].productAttributes[0].values[0].value).to.equal(attributesValueSuggestion)
            expect(response.body[0].brand).to.equal(brandSuggestion)
            expect(response.body[0].name).to.be.equal(nameVariant)
            expect(response.body[0].productDescription).to.be.equal(descriptionSuggestion)
            expect(response.body[0].productId).to.be.equal(clusterId)
            expect(response.body[0].productName).to.be.equal(nameClusterProcess)
            expect(response.body[0].productSlug).to.be.equal(slugCluster)
            expect(response.body[0].slug).to.be.equal(slugSku) /
            expect(response.body[0].images[0].sort).to.be.equal(imageSortSku)
            expect(response.body[0].images[0].ext).to.be.equal(imageExtSku)
            expect(response.body[0].images[0].path).to.be.equal(imagePathSku)
            expect(response.body[0].thumbnail.sort).to.be.equal(imageSortSku)
            expect(response.body[0].thumbnail.ext).to.be.equal(imageExtSku)
            expect(response.body[0].thumbnail.path).to.be.equal(imagePathSku)

        })
    })

    it('Validate Offer', () => {
        
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

   

})

describe('Process Suggestion NEW - 2 Variants - with cluster', () => {
   
    it('Create Cluster', () => {
        cy.api_generateClientTokenDevAdmin()
       
        cy.api_createCluster().then((response) => {
            Cypress.env('clusterIdNew', response.body._id)
            })           
    })

    it('Create Suggestion', () => {
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion2Variants()
        cy.wait(20000) //Aguardar processamento automático
    })

    it('Validating Suggestion after Automatic Processing', () => {
            
        let suggestionId = Cypress.env("suggestionId")

        cy.api_getSuggestionById(suggestionId).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body._id).to.be.not.null
        expect(response.body.status).to.equal("PENDING")   
        expect(response.body.variants[0].sellerSkuId).to.be.not.null 
        expect(response.body.variants[0].status).to.equal("PENDING")
        expect(response.body.variants[0].sku._id).to.be.not.null 
        expect(response.body.variants[0].sku.clusterId).to.be.not.null
        expect(response.body.cluster._id).to.be.not.null           
   
        })

    })

    it('Process Suggestion NEW with clusterId', () => {

        let suggestionId = Cypress.env('suggestionId')
        let clusterIdNew = Cypress.env('clusterIdNew')
       

        cy.api_generateClientTokenDevAdmin()
      
        cy.api_processSuggestionNEWwithCluster(clusterIdNew,suggestionId).then((response) => {
            expect(response.status).to.equal(202),
            expect(response.body.message).to.be.not.null,
            expect(response.body.reportId).to.be.not.null
        }),
        cy.wait(20000)
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")
            
            //Variant 1
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].sku._id).to.be.not.null
            Cypress.env('skuId', response.body.variants[0].sku._id)
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdNew)

            //Variant 2
            expect(response.body.variants[1].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].type).to.equal("NEW")
            expect(response.body.variants[1].sellerSkuId).to.be.not.null
            expect(response.body.variants[1].sku._id).to.be.not.null
            Cypress.env('skuId1', response.body.variants[1].sku._id)
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdNew)
            expect(response.body.cluster._id).to.be.equal(clusterIdNew) 
        })
    })

    it('Validate Report Logs NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
        let skuId = Cypress.env("skuId")
        let skuId1 = Cypress.env("skuId1")
    
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            //o reportlog as vezes muda a ordem sku e sku1
            expect(response.body.docs[1].status).to.equal("SUCCESS")
            //expect(response.body.docs[1].response.message).to.be.equal("SKU with ID \'" + skuId + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
        
            expect(response.body.docs[2].status).to.equal("SUCCESS")
            //expect(response.body.docs[2].response.message).to.be.equal("SKU with ID \'" + skuId1 + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.total).to.be.equal(3) //garantir que não criou mais nada
        })
    })
})

//Process NEW after Update

describe('Process Suggestion NEW - Suggestion REQUEST-CHANGES, 1 Variant ACCEPTED e 1 variant PENDING', () => {

    //Result: Suggestion and Variants ACCEPTED

    it('Create Suggestion - changing sellerSkuId', () => {
            
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant()
        cy.wait(20000)
    })
    
    it('Validating Suggestion after Automatic Processing', () => {
        
        let suggestionId = Cypress.env("suggestionId")

        cy.api_getSuggestionById(suggestionId).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body._id).to.be.not.null
        expect(response.body.status).to.equal("PENDING")   
        expect(response.body.variants[0].sellerSkuId).to.be.not.null 
        expect(response.body.variants[0].status).to.equal("PENDING")     
        })
    })

    it('Process Suggestion NEW - 1x', () => {
    
        let suggestionId = Cypress.env("suggestionId")

        cy.api_generateClientTokenDevAdmin()
        
        cy.api_processSuggestionNEW()
        cy.wait(20000)
        cy.log("Validating Processing Suggestion")        
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")           
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('sellerSkuIdFirst', response.body.variants[0].sellerSkuId)
            Cypress.env('skuIdFirst', response.body.variants[0].sku._id)
            Cypress.env('clusterIdSkuFirst', response.body.variants[0].sku.clusterId)            
            Cypress.env('clusterIdFirst', response.body.cluster._id)            
        })
    })

    it('Update Suggestion - info SellerSkuId', () => {
    
        const typeUpdate = "updateVariantSellerSkuId"

        cy.api_updateSuggestion1Variant(typeUpdate).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("REQUEST-CHANGES")    
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].sellerSkuId).to.be.not.null
            expect(response.body.variants[1].status).to.equal("PENDING")
            })
    })

    it('Suggestion By Id - after update', () => {

        let suggestionId = Cypress.env("suggestionId")
    
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("REQUEST-CHANGES")    
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].sellerSkuId).to.be.not.null
            expect(response.body.variants[1].status).to.equal("PENDING")         
        })

    })

    it('Process Suggestion NEW - 2x', () => {

        let suggestionId = Cypress.env("suggestionId")
        let sellerSkuIdFirst = Cypress.env("sellerSkuIdFirst")
        let skuIdFirst = Cypress.env("skuIdFirst")
        let clusterIdSkuFirst = Cypress.env("clusterIdSkuFirst")
        let clusterIdFirst = Cypress.env("clusterIdFirst")

        cy.api_generateClientTokenDevAdmin()
     
        cy.api_processSuggestionNEW()
        cy.wait(20000)
        cy.log("Validating Processing Suggestion")        
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")           
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].sellerSkuId).to.be.equal(sellerSkuIdFirst)
            expect(response.body.variants[0].sku._id).to.be.equal(skuIdFirst)
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdSkuFirst)
            expect(response.body.variants[1].status).to.equal("ACCEPTED")
            expect(response.body.variants[1].sellerSkuId).to.be.not.null
            expect(response.body.variants[1].sku._id).to.not.null
            expect(response.body.variants[1].sku.clusterId).to.be.equal(clusterIdSkuFirst)
            expect(response.body.cluster._id).to.be.equal(clusterIdFirst)
            Cypress.env('skuIdSecond', response.body.variants[1].sku._id)
            
        })
    })

    it('Validate Report Logs NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
        let skuIdSecond = Cypress.env("skuIdSecond")
        let clusterIdFirst = Cypress.env("clusterIdFirst")

        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("SKU with ID \'" + skuIdSecond + "\' successfully created for Suggestion with ID \'" + suggestionId + "\'.")
            expect(response.body.docs[1].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' successfully processed.")
            expect(response.body.docs[2].response.message).to.be.equal("Cluster with ID \'" + clusterIdFirst + "\' already created for Suggestion with Id \'" + suggestionId + "\'.")
            expect(response.body.total).to.be.equal(3) //garantir que não criou mais nada
        })
    })
})

describe('Process Suggestion NEW - Suggestion ACCEPTED e Variant REQUEST-CHANGES', () => {

    //Result: Não permitido

    it('Create Suggestion - changing sellerSkuId', () => {
            
        cy.api_generateClientTokenDevAdmin()
        cy.api_generateUserTokenDevSeller()
        cy.api_getWarehouses()
        cy.api_createSuggestion1Variant()
        cy.wait(20000)
    })
    
    it('Validating Suggestion after Automatic Processing', () => {
        
        let suggestionId = Cypress.env("suggestionId")

        cy.api_getSuggestionById(suggestionId).then((response) => {
        expect(response.status).to.equal(200)
        expect(response.body._id).to.be.not.null
        expect(response.body.status).to.equal("PENDING")   
        expect(response.body.variants[0].sellerSkuId).to.be.not.null 
        expect(response.body.variants[0].status).to.equal("PENDING")     
        })
    })

    it('Process Suggestion NEW', () => {
    
        let suggestionId = Cypress.env("suggestionId")

        cy.api_generateClientTokenDevAdmin()
      
        cy.api_processSuggestionNEW()
        cy.wait(20000)
        cy.log("Validating Processing Suggestion")        
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")           
            expect(response.body.variants[0].status).to.equal("ACCEPTED")
            expect(response.body.variants[0].type).to.equal("NEW")
            expect(response.body.cluster._id).to.be.not.null
            Cypress.env('sellerSkuId', response.body.variants[0].sellerSkuId)
            Cypress.env('skuId', response.body.variants[0].sku._id)
            Cypress.env('clusterIdSku', response.body.variants[0].sku.clusterId)            
            Cypress.env('clusterId', response.body.cluster._id)            
        })
    })

    it('Update Suggestion - info Variant', () => {
    
        const typeUpdate = "updateVariant"

        cy.api_updateSuggestion1Variant(typeUpdate).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")    
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].status).to.equal("REQUEST-CHANGES")
            })
    })

    it('Suggestion By Id - after update', () => {

        let suggestionId = Cypress.env("suggestionId")
    
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")    
            expect(response.body.variants[0].sellerSkuId).to.be.not.null
            expect(response.body.variants[0].status).to.equal("REQUEST-CHANGES")
        })

    })

    it('Process Suggestion NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
        let sellerSkuId = Cypress.env("sellerSkuId")
        let skuId = Cypress.env("skuId")
        let clusterIdSku = Cypress.env("clusterIdSku")
        let clusterId = Cypress.env("clusterId")

        cy.api_generateClientTokenDevAdmin()
    
        cy.api_processSuggestionNEW()
        cy.wait(20000)
        cy.log("Validating Processing Suggestion")        
        cy.api_getSuggestionById(suggestionId).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body._id).to.be.not.null
            expect(response.body.status).to.equal("ACCEPTED")
            expect(response.body.type).to.equal("NEW")           
            expect(response.body.variants[0].status).to.equal("REQUEST-CHANGES")
            expect(response.body.variants[0].sellerSkuId).to.be.equal(sellerSkuId)
            expect(response.body.variants[0].sku._id).to.be.equal(skuId)
            expect(response.body.variants[0].sku.clusterId).to.be.equal(clusterIdSku)
            expect(response.body.cluster._id).to.be.equal(clusterId)           
        })
    })

    it('Validate Report Logs NEW', () => {

        let suggestionId = Cypress.env("suggestionId")
    
        cy.api_getReportLogs().then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.docs[0].status).to.equal("SUCCESS")
            expect(response.body.docs[0].response.message).to.be.equal("Suggestion with ID \'" + suggestionId + "\' is already processed.")
            expect(response.body.total).to.be.equal(1) //garantir que não criou mais nada                    
        })
    })
})




