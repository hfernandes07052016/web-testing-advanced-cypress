const createNewUserJson = require('../fixtures/payloads/Catalog/Cluster/createCluster.json')
const { faker } = require('@faker-js/faker')
const updateClusterJson = require('../fixtures/payloads/Catalog/Cluster/updateCluster.json')
const createClusterJson = require('../fixtures/payloads/Catalog/Cluster/createCluster.json')
const createClusterRequiredFieldsJson = require ('../fixtures/payloads/Catalog/Cluster/createClusterRequiredFields.json')
const publishClusterJson = require('../fixtures/payloads/Catalog/Cluster/publishCluster.json')
const unPublishClusterJson = require('../fixtures/payloads/Catalog/Cluster/unpublishCluster.json')
const createSkuJson = require('../fixtures/payloads/Catalog/Skus/createSku.json')
const createSkuRequiredFieldsJson = require('../fixtures/payloads/Catalog/Skus/createSkuRequiredFields.json')
const publishSkuJson = require('../fixtures/payloads/Catalog/Skus/publishSku.json')
const unPublishSkuJson = require('../fixtures/payloads/Catalog/Skus/unpublishSku.json')
const updateSkuJson = require('../fixtures/payloads/Catalog/Skus/updateSku.json')
const createSuggestion1VariantJson = require('../fixtures/payloads/Catalog/Suggestion/createSuggestion1Variant.json')
const createSuggestion2VariantsJson = require('../fixtures/payloads/Catalog/Suggestion/createSuggestion2Variants.json')
const unlinkSuggestionJson = require('../fixtures/payloads/Catalog/Suggestion/unlinkSuggestion.json')
const processSuggestionNEWJson = require('../fixtures/payloads/Catalog/Suggestion/processSuggestionNEW.json')
const processSuggestionMATCHJson = require('../fixtures/payloads/Catalog/Suggestion/processSuggestionMATCH.json')
const processSuggestionNEWwithClusterJson = require('../fixtures/payloads/Catalog/Suggestion/processSuggestionNEWwithCluster.json')
const processSuggestionNEWcomAlteracaoJson = require('../fixtures/payloads/Catalog/Suggestion/processSuggestionNEWcomAlteracao.json') 
const updateOfferBySellerJson = require('..//fixtures/payloads/Catalog/Offer/updateOfferBySeller.json')
const createSuggestionRequiredFieldsJson = require('../fixtures/payloads/Catalog/Suggestion/createSuggestionRequiredFields.json')
const createCollectionJson = require('..//fixtures/payloads/Catalog/Collection/createCollection.json')
const updateCollectionJson = require('..//fixtures/payloads/Catalog/Collection/updateCollection.json')
const updateCollectionRequiredFieldsJson = require('..//fixtures/payloads/Catalog/Collection/updateCollectionRequiredFields.json')
const getVariantsByIdListJson = require ('../fixtures/payloads/Catalog/Product and SKUs/getVariantsByIdList.json')
const publishCollectionsJson = require ('../fixtures/payloads/Catalog/Collection/publishCollections.json')
const unpublishCollectionsJson = require ('../fixtures/payloads/Catalog/Collection/unpublishCollections.json')

//Commands Cluster

Cypress.Commands.add('api_createCluster', () => {
    let token = Cypress.env("token")
    let random = ("Name cluster -" + (Math.random() + 1).toString(36).substring(7))

    createClusterJson.name = random

    cy.request({
        method: 'POST',
        url: "/catalogue/cluster",
        body: createClusterJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('clusterId', response.body._id)
        Cypress.env('slugCluster', response.body.slug)
        Cypress.env('nameCluster', response.body.name)
        Cypress.env('descriptionCluster', response.body.description)
        Cypress.env('shortDescriptionCluster', response.body.shortDescription)
        Cypress.env('brandCluster', response.body.brand)
        Cypress.env('attributesNameCluster', response.body.attributes[0].name)
        Cypress.env('attributesCodeCluster', response.body.attributes[0].code)
        Cypress.env('attributesValuesCodeCluster', response.body.attributes[0].values[0].code)
        Cypress.env('attributesValuesvalueCluster', response.body.attributes[0].values[0].value)  
    })
})

Cypress.Commands.add('api_createClusterRequiredFields', () => {
    let token = Cypress.env("token")

    cy.request({
        method: 'POST',
        url: "/catalogue/cluster",
        body: createClusterRequiredFieldsJson,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_getClusterById', (clusterId) => {
    let token = Cypress.env("token")
    
    cy.request({
        method: 'GET',
        url: "/catalogue/cluster/id/" + clusterId,
        failOnStatusCode:false,
        headers: { Authorization: token }
    })

})

Cypress.Commands.add('api_getCluster', () => {
    let token = Cypress.env("token")
    cy.request({
        method: 'GET',
        url: "/catalogue/clusters",
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_updateCluster', () => {
    let token = Cypress.env("token")
    let clusterId = Cypress.env("clusterId")

    cy.request({
        method: 'PUT',
        url: "/catalogue/cluster/" + clusterId,
        body: updateClusterJson,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_deleteCluster', () => {
    let clusterId = Cypress.env("clusterId")
    let token = Cypress.env("token")

    cy.request({
        method: 'DELETE',
        url: "/catalogue/cluster/" + clusterId,
        failOnStatusCode:false,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_getClusterBySlug', () => {
    let token = Cypress.env("token")
    let slugCluster = Cypress.env("slugCluster")
    cy.request({
        method: 'GET',
        url: "/catalogue/cluster/slug/" + slugCluster,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_publishCluster', (clusterId) => {
    let token = Cypress.env("token")
 
   publishClusterJson.clusterIds[0] = clusterId 

    cy.request({
        method: 'POST',
        url: "/catalogue/cluster/publish",
        body: publishClusterJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})

Cypress.Commands.add('api_unPublishCluster', (clusterId) => {
    let token = Cypress.env("token")   

   unPublishClusterJson.clusterIds[0] = clusterId 

    cy.request({
        method: 'POST',
        url: "/catalogue/cluster/unpublish",
        body: unPublishClusterJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})


//Collection

Cypress.Commands.add('api_createCollection', () => {
    let token = Cypress.env("token")
    
    cy.request({
        method: 'POST',
        url: "/catalogue/collection",
        body: createCollectionJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('collectionId', response.body._id)
    })       
})

Cypress.Commands.add('api_publishCollections', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")

    publishCollectionsJson.collectionIds[0] = collectionId

    cy.request({
        method: 'POST',
        url: "/catalogue/collection/publish",
        body: publishCollectionsJson,
        headers: { Authorization: token }
    })       
})

Cypress.Commands.add('api_unpublishCollections', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")
    
    unpublishCollectionsJson.collectionIds[0] = collectionId

    cy.request({
        method: 'POST',
        url: "/catalogue/collection/unpublish", 
        body: unpublishCollectionsJson,
        headers: { Authorization: token }
    })       
})

Cypress.Commands.add('api_getCollections', () => {
    let token = Cypress.env("token")
    
    cy.request({
        method: 'GET',
        url: "/catalogue/collections",
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('collectionId', response.body.docs[0]._id)
    })       
})

Cypress.Commands.add('api_getCollectionById', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")
    cy.request({
        method: 'GET',
        url: "/catalogue/collection/id/" + collectionId,
        headers: { Authorization: token }
    })       
})

Cypress.Commands.add('api_deleteCollection', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")
    cy.request({
        method: 'Delete',
        url: "/catalogue/collection/" + collectionId,
        headers: { Authorization: token }
    })       
})

Cypress.Commands.add('api_updateCollection', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")

    cy.request({
        method: 'PUT',
        url: "/catalogue/collection/" + collectionId,
        body: updateCollectionJson,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_updateCollectionRequiredFields', () => {
    let token = Cypress.env("token")
    let collectionId = Cypress.env("collectionId")

    cy.request({
        method: 'PUT',
        url: "/catalogue/collection/" + collectionId,
        body: updateCollectionRequiredFieldsJson,
        headers: { Authorization: token }
    })
})


//Offer

Cypress.Commands.add('api_updateOfferBySeller', (price, originalPrice, quantity) => {
    let token = Cypress.env("userToken")
    let sellerSkuId = Cypress.env("sellerSkuId")
    let warehouseId = Cypress.env("warehouseId")

    updateOfferBySellerJson[0].sellerSkuId = sellerSkuId   
    updateOfferBySellerJson[0].price = price
    updateOfferBySellerJson[0].originalPrice = originalPrice
    updateOfferBySellerJson[0].warehouses[0].quantity = quantity
    updateOfferBySellerJson[0].warehouses[0]._id = warehouseId


    cy.request({
        method: 'POST',
        url: "/catalogue/offer",
        body: updateOfferBySellerJson,
        headers: { Authorization: token }
    })
})



// Commands Product and Skus

Cypress.Commands.add('api_getVariantsbyIdList', (skuId) => {
    let token = Cypress.env("token")
   
    getVariantsByIdListJson.skuIds[0] = skuId,

    cy.request({
        method: 'POST',
        url: "/catalogue/variantsByIdList",
        body: getVariantsByIdListJson,
        headers: { Authorization: token }
    })
})




    
// Commands Sku

Cypress.Commands.add('api_getSkus', () => {
    let token = Cypress.env("token")

    cy.request({
        method: 'GET',
        url: "/catalogue/skus",
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('skuId', response.body.docs[0]._id)
    })

})

Cypress.Commands.add('api_createSku', () => {
    let token = Cypress.env("token")
    let clusterId = Cypress.env("clusterId")

    createSkuJson.clusterId = clusterId

    cy.request({
        method: 'POST',
        url: "/catalogue/sku",
        body: createSkuJson,
        headers: { Authorization: token }
    }).then((response) => {
    Cypress.env('skuId', response.body._id)
    Cypress.env('slugSku', response.body.slug)
    Cypress.env('tagsSku', response.body.tags[0])
    Cypress.env('categoriesSku', response.body.categories[0])
    //siteId
    Cypress.env('skuTypeSku', response.body.type)
    Cypress.env('nameSku', response.body.name) 
    Cypress.env('descriptionSku', response.body.description) 
    Cypress.env('shortDescriptionSku', response.body.shortDescription)
    Cypress.env('eanSku', response.body.ean)
    Cypress.env('imageSortSku', response.body.images[0].sort)
    Cypress.env('imageExtSku', response.body.images[0].ext)
    Cypress.env('imagePathSku', response.body.images[0].path)
    Cypress.env('attributesNameSku', response.body.attributes[0].name)
    Cypress.env('attributesCodeSku', response.body.attributes[0].code)
    Cypress.env('attributesValuesCodeSku', response.body.attributes[0].values[0].code)
    Cypress.env('attributesValuesvalueSku', response.body.attributes[0].values[0].value)    
    Cypress.env('dimensionsWeightSku', response.body.dimensions.weight)
    Cypress.env('dimensionsWidthSku', response.body.dimensions.width)
    Cypress.env('dimensionsHeightSku', response.body.dimensions.height)
    Cypress.env('dimensionsLengthSku', response.body.dimensions.length)
    })
})

Cypress.Commands.add('api_createSkuRequiredFields', () => {
    let token = Cypress.env("token")
    let clusterId = Cypress.env("clusterId")

    createSkuRequiredFieldsJson.clusterId = clusterId

    cy.request({
        method: 'POST',
        url: "/catalogue/sku",
        body: createSkuRequiredFieldsJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('skuId', response.body._id)
    })
})

Cypress.Commands.add('api_updateSku', () => {
    let token = Cypress.env("token")
    let skuId = Cypress.env("skuId")
    let clusterId = Cypress.env("clusterId")

    updateSkuJson.clusterId = clusterId

    cy.request({
        method: 'PUT',
        url: "/catalogue/sku/" + skuId,
        body: updateSkuJson,
        headers: { Authorization: token }
    })
})


Cypress.Commands.add('api_publishSku', (skuId) => {
    let token = Cypress.env("token")  
  
   publishSkuJson.skuIds[0] = skuId

    cy.request({
        method: 'POST',
        url: "/catalogue/sku/publish",
        body: publishSkuJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})

Cypress.Commands.add('api_unPublishSku', (skuId) => {
    let token = Cypress.env("token")

   unPublishSkuJson.skuIds[0] = skuId 

    cy.request({
        method: 'POST',
        url: "/catalogue/sku/unpublish",
        body: unPublishSkuJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})

Cypress.Commands.add('api_getSkuById', (skuId) => {
    let token = Cypress.env("token")

    cy.request({
        method: 'GET',
        url: "/catalogue/sku/id/" + skuId,
        failOnStatusCode:false,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_deleteSku', () => {
    let skuId = Cypress.env("skuId")
    let token = Cypress.env("token")
    cy.request({
        method: 'DELETE',
        url: "/catalogue/sku/" + skuId,
        failOnStatusCode:false,
        headers: { Authorization: token }
    })
})


// Commands Suggestion

Cypress.Commands.add('api_createSuggestion1Variant', (typeSuggestion) => {
    let token = Cypress.env("userToken")
    let warehouseId = Cypress.env("warehouseId")
    let randomSellerSkuId = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))
    let randomName = ("Name Suggestion -" + (Math.random() + 1).toString(36).substring(7))
    let randomDescription = ("Description Suggestion -" + (Math.random() + 1).toString(36).substring(7))
    let randomEan = ("ean -" + (Math.random() + 1).toString(36).substring(7))
    let nameSuggestionOriginal = "Name Suggestion"
    let descriptionSuggestionOriginal = "Descrição Suggestion"
    let eanVariantOriginal = "ean-Variant1"
    
    createSuggestion1VariantJson.name = nameSuggestionOriginal
    createSuggestion1VariantJson.description = descriptionSuggestionOriginal
    createSuggestion1VariantJson.variants[0].ean = eanVariantOriginal
   
    if (typeSuggestion == "suggestion-new"){
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion1VariantJson.variants[0].sellerSkuId = randomSellerSkuId
        createSuggestion1VariantJson.variants[0].ean = randomEan
        createSuggestion1VariantJson.name = randomName
        createSuggestion1VariantJson.description = randomDescription
   
        
    } else if (typeSuggestion == "suggestion-match") {
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion1VariantJson.variants[0].sellerSkuId = randomSellerSkuId
        createSuggestion1VariantJson.variants[0].ean = randomEan
   
    }
    else {
        createSuggestion1VariantJson.variants[0].sellerSkuId = randomSellerSkuId
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId
    }

    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion",
        body: createSuggestion1VariantJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('suggestionId', response.body._id)
        Cypress.env('brandSuggestion', response.body.brand)
        Cypress.env('nameSuggestion', response.body.name) 
        Cypress.env('descriptionSuggestion', response.body.description)
        Cypress.env('shortDescriptionSuggestion', response.body.shortDescription)
        Cypress.env('imageSortSuggestion', response.body.images[0].sort)
        Cypress.env('imageExtSuggestion', response.body.images[0].ext)
        Cypress.env('imagePathSuggestion', response.body.images[0].path)
        Cypress.env('attributesValueSuggestion', response.body.attributes[0].values[0])
        Cypress.env('attributesNameSuggestion', response.body.attributes[0].name)
        Cypress.env('tagsVariant', response.body.variants[0].tags[0])
        Cypress.env('categoriesVariant', response.body.variants[0].categories[0])
        Cypress.env('skuTypeVariant', response.body.variants[0].skuType)
        Cypress.env('nameVariant', response.body.variants[0].name) 
        Cypress.env('sellerSkuId', response.body.variants[0].sellerSkuId)
        Cypress.env('descriptionVariant', response.body.variants[0].description) 
        Cypress.env('shortDescriptionVariant', response.body.variants[0].shortDescription)
        Cypress.env('eanVariant', response.body.variants[0].ean)
        Cypress.env('imageSortVariant', response.body.variants[0].sort)
        Cypress.env('imageExtVariant', response.body.variants[0].ext)
        Cypress.env('imagePathVariant', response.body.variants[0].path)
        Cypress.env('attributesNameVariant', response.body.variants[0].attributes[0].name)
        Cypress.env('attributesValueVariant', response.body.variants[0].attributes[0].value)
        Cypress.env('dimensionsWeightVariant', response.body.variants[0].dimensions.weight)
        Cypress.env('dimensionsWidthVariant', response.body.variants[0].dimensions.width)
        Cypress.env('dimensionsHeightVariant', response.body.variants[0].dimensions.height)
        Cypress.env('dimensionsLengthVariant', response.body.variants[0].dimensions.length)
        Cypress.env('priceVariantOffer', response.body.variants[0].offer.price) 
        Cypress.env('originalPriceVariantOffer', response.body.variants[0].offer.originalPrice)
        Cypress.env('quantityVariantOffer', response.body.variants[0].offer.warehouses[0].quantity)
    
    
    })    
})

Cypress.Commands.add('api_createSuggestion2Variants', (typeSuggestion) => {
    
    let token = Cypress.env("userToken")
    let warehouseId = Cypress.env("warehouseId")
    let randomSellerSkuId1 = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))
    let randomSellerSkuId2 = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))
    let randomName = ("Name Suggestion -" + (Math.random() + 1).toString(36).substring(7))
    let randomDescription = ("Description Suggestion -" + (Math.random() + 1).toString(36).substring(7))
    let randomEan1 = ("ean -" + (Math.random() + 1).toString(36).substring(7))
    let randomEan2 = ("ean -" + (Math.random() + 1).toString(36).substring(7))
    let nameSuggestionOriginal = "Name Suggestion"
    let descriptionSuggestionOriginal = "Descrição Suggestion"
    let eanVariantOriginal = "ean-Variant1"
    let eanVariantOriginal1 = "ean-Variant2"
    
    createSuggestion2VariantsJson.name = nameSuggestionOriginal
    createSuggestion2VariantsJson.description = descriptionSuggestionOriginal
    createSuggestion2VariantsJson.variants[0].sellerSkuId = randomSellerSkuId1
    createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId
    createSuggestion2VariantsJson.variants[0].ean = eanVariantOriginal
    createSuggestion2VariantsJson.variants[1].sellerSkuId = randomSellerSkuId2
    createSuggestion2VariantsJson.variants[1].offer.warehouses[0]._id = warehouseId
    createSuggestion2VariantsJson.variants[1].ean = eanVariantOriginal1

    if (typeSuggestion == "suggestion-new"){
        createSuggestion2VariantsJson.name = randomName
        createSuggestion2VariantsJson.description = randomDescription
        createSuggestion2VariantsJson.variants[0].sellerSkuId = randomSellerSkuId1
        createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion2VariantsJson.variants[0].ean = randomEan1
        createSuggestion2VariantsJson.variants[1].sellerSkuId = randomSellerSkuId2
        createSuggestion2VariantsJson.variants[1].offer.warehouses[0]._id = warehouseId
        createSuggestion2VariantsJson.variants[1].ean = randomEan2
    } else if (typeSuggestion == "suggestion-match") {
        createSuggestion2VariantsJson.variants[0].sellerSkuId = randomSellerSkuId1
        createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion2VariantsJson.variants[0].ean = randomEan1
        createSuggestion2VariantsJson.variants[1].sellerSkuId = randomSellerSkuId2
        createSuggestion2VariantsJson.variants[1].offer.warehouses[0]._id = warehouseId
        createSuggestion2VariantsJson.variants[1].ean = randomEan2
    }
    else {
        createSuggestion2VariantsJson.variants[0].sellerSkuId = randomSellerSkuId1
        createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion2VariantsJson.variants[1].sellerSkuId = randomSellerSkuId2
        createSuggestion2VariantsJson.variants[1].offer.warehouses[0]._id = warehouseId
    }

    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion",
        body: createSuggestion2VariantsJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('suggestionId', response.body._id)
        Cypress.env('brandSuggestion', response.body.brand)
        Cypress.env('nameSuggestion', response.body.name) 
        Cypress.env('descriptionSuggestion', response.body.description)
        Cypress.env('shortDescriptionSuggestion', response.body.shortDescription)
        Cypress.env('imageSortSuggestion', response.body.images[0].sort)
        Cypress.env('imageExtSuggestion', response.body.images[0].ext)
        Cypress.env('imagePathSuggestion', response.body.images[0].path)
        Cypress.env('attributesValueSuggestion', response.body.attributes[0].values[0])
        Cypress.env('attributesNameSuggestion', response.body.attributes[0].name)
        //Variant1
        Cypress.env('tagsVariant', response.body.variants[0].tags[0])
        Cypress.env('categoriesVariant', response.body.variants[0].categories[0])
        Cypress.env('skuTypeVariant', response.body.variants[0].skuType)
        Cypress.env('nameVariant', response.body.variants[0].name) 
        Cypress.env('sellerSkuId', response.body.variants[0].sellerSkuId)
        Cypress.env('descriptionVariant', response.body.variants[0].description) 
        Cypress.env('shortDescriptionVariant', response.body.variants[0].shortDescription)
        Cypress.env('eanVariant', response.body.variants[0].ean)
        Cypress.env('imageSortVariant', response.body.variants[0].images[0].sort)
        Cypress.env('imageExtVariant', response.body.variants[0].images[0].ext)
        Cypress.env('imagePathVariant', response.body.variants[0].images[0].path)
        Cypress.env('attributesNameVariant', response.body.variants[0].attributes[0].name)
        Cypress.env('attributesValueVariant', response.body.variants[0].attributes[0].value)
        Cypress.env('dimensionsWeightVariant', response.body.variants[0].dimensions.weight)
        Cypress.env('dimensionsWidthVariant', response.body.variants[0].dimensions.width)
        Cypress.env('dimensionsHeightVariant', response.body.variants[0].dimensions.height)
        Cypress.env('dimensionsLengthVariant', response.body.variants[0].dimensions.length)
        Cypress.env('priceVariantOffer', response.body.variants[0].offer.price) 
        Cypress.env('originalPriceVariantOffer', response.body.variants[0].offer.originalPrice)
        Cypress.env('quantityVariantOffer', response.body.variants[0].offer.warehouses[0].quantity)
        //Variant2
        Cypress.env('tagsVariant1', response.body.variants[1].tags[0])
        Cypress.env('categoriesVariant1', response.body.variants[1].categories[0])
        Cypress.env('skuTypeVariant1', response.body.variants[1].skuType)
        Cypress.env('nameVariant1', response.body.variants[1].name) 
        Cypress.env('sellerSkuId1', response.body.variants[1].sellerSkuId)
        Cypress.env('descriptionVariant1', response.body.variants[1].description) 
        Cypress.env('shortDescriptionVariant1', response.body.variants[1].shortDescription)
        Cypress.env('eanVariant1', response.body.variants[1].ean)
        Cypress.env('imageSortVariant1', response.body.variants[1].sort)
        Cypress.env('imageExtVariant1', response.body.variants[1].ext)
        Cypress.env('imagePathVariant1', response.body.variants[1].path)
        Cypress.env('attributesNameVariant1', response.body.variants[1].attributes[0].name)
        Cypress.env('attributesValueVariant1', response.body.variants[1].attributes[0].value)
        Cypress.env('dimensionsWeightVariant1', response.body.variants[1].dimensions.weight)
        Cypress.env('dimensionsWidthVariant1', response.body.variants[1].dimensions.width)
        Cypress.env('dimensionsHeightVariant1', response.body.variants[1].dimensions.height)
        Cypress.env('dimensionsLengthVariant1', response.body.variants[1].dimensions.length)
        Cypress.env('priceVariantOffer1', response.body.variants[1].offer.price) 
        Cypress.env('originalPriceVariantOffer1', response.body.variants[1].offer.originalPrice)
        Cypress.env('quantityVariantOffer1', response.body.variants[1].offer.warehouses[0].quantity)
    })    
})

Cypress.Commands.add('api_createSuggestionRequiredFields', (typeSuggestion) => {
    let token = Cypress.env("userToken")
    let random = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))
    let sellerSkuId = Cypress.env("sellerSkuId")
      
    if (typeSuggestion == "sameSellerSkuId") {
        createSuggestionRequiredFieldsJson.variants[0].sellerSkuId = sellerSkuId
    } else {
        createSuggestionRequiredFieldsJson.variants[0].sellerSkuId = random
    }

    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion",
        body: createSuggestionRequiredFieldsJson,
        failOnStatusCode:false,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('suggestionId', response.body._id)
//      Cypress.env('sellerSkuId', response.body.variants[0].sellerSkuId)
    })       
})

Cypress.Commands.add('api_deleteSuggestion', () => {
    let suggestionId = Cypress.env("suggestionId")
    let token = Cypress.env("userToken")
    cy.request({
        method: 'DELETE',
        url: "/catalogue/suggestion/" + suggestionId,
        failOnStatusCode: false,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_getSuggestionById', (suggestionId) => {
    let token = Cypress.env("userToken")
   
    cy.request({
        method: 'GET',
        url: "/catalogue/suggestion/id/" + suggestionId,
        failOnStatusCode: false,
        headers: { Authorization: token }
    })
    
})

Cypress.Commands.add('api_unlinkSuggestion', () => {
    let token = Cypress.env("userToken")
    let suggestionId = Cypress.env("suggestionId")

    unlinkSuggestionJson[0].suggestionId = suggestionId

    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion/unlink",
        headers: { Authorization: token },
        body: unlinkSuggestionJson
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})

Cypress.Commands.add('api_processSuggestionNEW', () => {
    let suggestionId = Cypress.env("suggestionId")
    let token = Cypress.env("token")
    
    processSuggestionNEWJson[0].suggestionId = suggestionId
    
    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion/process",
        body: processSuggestionNEWJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })
})

Cypress.Commands.add('api_processSuggestionNEWwithCluster', (clusterIdNew,suggestionId) => {
    
    let token = Cypress.env("token")
    
    processSuggestionNEWwithClusterJson[0].suggestionId = suggestionId
    processSuggestionNEWwithClusterJson[0].clusterId = clusterIdNew
    
    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion/process",
        body: processSuggestionNEWwithClusterJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })

})

Cypress.Commands.add('api_processSuggestionNEWcomAlteracao', () => {
    let suggestionId = Cypress.env("suggestionId")
    let token = Cypress.env("token")
    let sellerSkuId = Cypress.env("sellerSkuId")

    processSuggestionNEWcomAlteracaoJson[0].suggestionId = suggestionId
    processSuggestionNEWcomAlteracaoJson[0].variants[0].sellerSkuId = sellerSkuId


    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion/process",
        body: processSuggestionNEWcomAlteracaoJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)
    })

})

Cypress.Commands.add('api_processSuggestionMATCH', (skuId, clusterId,sellerSkuId) => {
    let suggestionId = Cypress.env("suggestionId")
    let token = Cypress.env("token")
    
    processSuggestionMATCHJson[0].suggestionId = suggestionId
    processSuggestionMATCHJson[0].clusterId = clusterId
    processSuggestionMATCHJson[0].variantsSuggestion[0].sellerSkuId = sellerSkuId
    processSuggestionMATCHJson[0].variantsSuggestion[0].skuId = skuId
    
    cy.request({
        method: 'POST',
        url: "/catalogue/suggestion/process",
        body: processSuggestionMATCHJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('reportId', response.body.reportId)

    })

})

Cypress.Commands.add('api_getSuggestions', () => {
    let token = Cypress.env("userToken")
    cy.request({
        
        method: 'GET',
        url: "/catalogue/suggestions",
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_updateSuggestion1Variant', (typeUpdate) => {
    let token = Cypress.env("userToken")    
    let suggestionId = Cypress.env("suggestionId")
    let warehouseId = Cypress.env("warehouseId")
    let nameSuggestionOriginal = Cypress.env("nameSuggestion")
    let descriptionSuggestionOriginal = Cypress.env("descriptionSuggestion")
    let descriptionVariantOriginal = Cypress.env("descriptionVariant")
    let sellerSkuId = Cypress.env("sellerSkuId")
    let eanVariantOriginal = Cypress.env("eanVariant")
    let descriptionSuggestionUpdate = "descrição da suggestion alterado"
    let descriptionVariantUpdate = "descrição da variant alterado"
    let newSellerSkuId = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))
 
    createSuggestion1VariantJson.name = nameSuggestionOriginal
    createSuggestion1VariantJson.description = descriptionSuggestionOriginal
    createSuggestion1VariantJson.variants[0].description = descriptionVariantOriginal
    createSuggestion1VariantJson.variants[0].sellerSkuId = sellerSkuId
    createSuggestion1VariantJson.variants[0].ean = eanVariantOriginal
    
  
    if (typeUpdate == "updateSuggestion"){
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion1VariantJson.description = descriptionSuggestionUpdate
     
    } else if  (typeUpdate == "updateVariant") {
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId
        createSuggestion1VariantJson.variants[0].description = descriptionVariantUpdate   
       
    } else if (typeUpdate == "updateVariantSellerSkuId") {
        createSuggestion1VariantJson.variants[0].sellerSkuId = newSellerSkuId
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId    
    } else if (typeUpdate == "updateEqual") {   
        createSuggestion1VariantJson.variants[0].offer.warehouses[0]._id = warehouseId    
    }

    cy.request({
        method: 'PUT',
        url: "/catalogue/suggestion/" + suggestionId,
        body: createSuggestion1VariantJson,
        headers: { Authorization: token }
    })

})

Cypress.Commands.add('api_updateSuggestion2Variants', (typeUpdate) => {
    let token = Cypress.env("userToken")
    let suggestionId = Cypress.env("suggestionId")
    let warehouseId = Cypress.env("warehouseId")
    let nameSuggestionOriginal = Cypress.env("nameSuggestion")
    let descriptionSuggestionOriginal = Cypress.env("descriptionSuggestion")
    let descriptionVariantOriginal = Cypress.env("descriptionVariant")
    let descriptionVariantOriginal1 = Cypress.env("descriptionVariant1")    
    let sellerSkuId = Cypress.env("sellerSkuId")
    let sellerSkuId1 = Cypress.env("sellerSkuId1")
    let eanVariantOriginal = Cypress.env("eanVariant")
    let eanVariantOriginal1 = Cypress.env("eanVariant1")
    let descriptionSuggestionUpdate = "descrição da suggestion alterado"
    let descriptionVariantUpdate = "descrição da variant alterado"
    
    let newSellerSkuId = ("sellerSkuId-" + (Math.random() + 1).toString(36).substring(7))    
    
    createSuggestion2VariantsJson.name = nameSuggestionOriginal
    createSuggestion2VariantsJson.description = descriptionSuggestionOriginal
    createSuggestion2VariantsJson.variants[0].description = descriptionVariantOriginal
    createSuggestion2VariantsJson.variants[0].sellerSkuId = sellerSkuId
    createSuggestion2VariantsJson.variants[0].ean = eanVariantOriginal
    createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId        
    createSuggestion2VariantsJson.variants[1].description = descriptionVariantOriginal1
    createSuggestion2VariantsJson.variants[1].sellerSkuId1 = sellerSkuId1
    createSuggestion2VariantsJson.variants[1].ean = eanVariantOriginal1
    createSuggestion2VariantsJson.variants[1].offer.warehouses[0]._id = warehouseId

    if (typeUpdate == "updateSuggestion"){
        createSuggestion2VariantsJson.description = descriptionSuggestionUpdate
    } else if  (typeUpdate == "updateVariant") {
        createSuggestion2VariantsJson.variants[0].description = descriptionVariantUpdate
    } else if  (typeUpdate == "updateVariantSellerSkuId") {
        createSuggestion2VariantsJson.variants[0].sellerSkuId = newSellerSkuId
    } else if (typeUpdate == "updateEqual") {
        createSuggestion2VariantsJson.variants[0].sellerSkuId = sellerSkuId
        createSuggestion2VariantsJson.variants[0].offer.warehouses[0]._id = warehouseId
    }

    cy.request({
        method: 'PUT',
        url: "/catalogue/suggestion/" + suggestionId,
        body: createSuggestion2VariantsJson,
        headers: { Authorization: token }
    })

})




/* CODIGO FEITO PELO HELDER - Depois vamos reutilizar

Cypress.Commands.add('api_getSuggestionById', () => {
    let token = Cypress.env("userToken")
    let suggestionId = Cypress.env("suggestionId")

    cy.request({
        method: 'GET',
        url: "/catalogue/suggestion/id/" + suggestionId,
        headers: { Authorization: token }
    }).then((response) => {

        const variants = response.body.variants

        variants.forEach(variant => {

            const status = variant.status;

            expect(status).to.equal("ACCEPTED")

            Cypress.env('skuID', variant.sku._id)
            Cypress.env('ClusterId', response.body.cluster._id)

        })
    })
})*/
