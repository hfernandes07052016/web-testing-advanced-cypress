const accessToken = `Bearer ${Cypress.env('authorization_client')}`
const createNewClientAdminJson = require('../fixtures/payloads/Authorizer/Client/createNewClientAdmin.json')
const createNewClientfrontJson = require('../fixtures/payloads/Authorizer/Client/createNewClientFront.json')
const createNewUserJson = require('../fixtures/payloads/Authorizer/User/createNewUser.json')
const updateUserPassword = require('../fixtures/payloads/Authorizer/User/updateUserPassword.json')
const handleRecoverTokenJson = require('../fixtures/payloads/Authorizer/User/handleRecoveryToken.json')
const generateUserTokenSeller = require ('../fixtures/payloads/Authorizer/User/generateUserToken.json')
const generateUserTokenSandboxMkCustomerJson = require ('../fixtures/payloads/Authorizer/User/generateUserTokenSandBoxMkCustomer.json')
const generateClientTokenDevFrontJson = require ('../fixtures/payloads/Authorizer/Client/generateClientTokenDevFront.json')
const generateUserTokenDevCustomerJson = require ('../fixtures/payloads/Authorizer/User/generateUserTokenDevCustomer.json')
const generateClientTokenDevAdminJson = require ('../fixtures/payloads/Authorizer/Client/generateClientTokenDevAdmin.json')
const generateUserTokenDevSellerJson = require ('../fixtures/payloads/Authorizer/User/generateUserTokenDevSeller.json')
const generateUserTokenDevSeller2Json = require('../fixtures/payloads/Authorizer/User/generateUserTokenDevSeller2.json')
const generateUserTokenDevAdminJson = require ('../fixtures/payloads/Authorizer/User/generateUserTokenDevAdmin.json')

Cypress.Commands.add('api_createNewClient', (typeClient) => {
    var body = ""

    if (typeClient == "STORE-FRONT") {
        body = createNewClientfrontJson
    } else if (typeClient == "STORE-ADMIN")
        body = createNewClientAdminJson
    name = createNewClientAdminJson.name
    cy.log("client =", body)
    cy.log("client =", typeClient)

    cy.request({
        method: 'POST',
        url: `/oauth/client/create`,
        body: body,
        headers: { Authorization: accessToken },
    }).then((response) => {
        Cypress.env("secret", response.body.secret)
        Cypress.env("id", response.body._id)
    })
})

Cypress.Commands.add('api_generateClientToken', () => {

    let clientId = Cypress.env("id")
    let clientSecret = Cypress.env("secret")
    cy.request({
        method: 'POST',
        url: "/oauth/client/token",
        body: {
            clientId,
            clientSecret
        }
    }).then((response) => {
        Cypress.env("token", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})


Cypress.Commands.add('api_generateClientTokenDevFront', () => {

    cy.request({
        method: 'POST',
        url: "/oauth/client/token",
        body: generateClientTokenDevFrontJson
    }).then((response) => {
        Cypress.env("token", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateClientTokenDevAdmin', () => {
    

    /*
    const dev = process.env.ENVIRONMENT
    cy.log(dev)

    const generateClientTokenAdminJsonDefault = ""

    if (dev=="sandbox") {
        generateClientTokenAdminJsonDefault = generateClientTokenSandboxAdminJson
    }else if (dev=="development") {
        generateClientTokenAdminJsonDefault = generateClientTokenDevAdminJson
    }
    */

    cy.request({
        method: 'POST',
        url: "/oauth/client/token",
        body: generateClientTokenDevAdminJson
    }).then((response) => {
        Cypress.env("token", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateUserTokenDevSeller', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenDevSellerJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateUserTokenDevSeller2', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenDevSeller2Json,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})


Cypress.Commands.add('api_generateUserTokenDevAdmin', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenDevAdminJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateUserTokenDevCustomer', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenDevCustomerJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateClientTokenReused', () => {
    var body = ""
    if (typeClient == "STORE-FRONT") {
        body = generateClientTokenFrJson
    } else if (typeClient == "STORE-ADMIN")
        body = generateClientTokenJson

    cy.request({
        method: 'POST',
        url: "/oauth/client/token",
        body: body
    }).then((response) => {
        Cypress.env("token", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateUserTokenReused', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenSeller,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})

Cypress.Commands.add('api_generateUserTokenSandboxMkCustomer', () => {
    let token = Cypress.env('token')

    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: generateUserTokenSandboxMkCustomerJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env("userToken", "Bearer " + response.body.token)
        Cypress.env("tokenRefresh", response.body.refreshToken)
    })
})




Cypress.Commands.add('api_createNewUser', () => {
    let token = Cypress.env("token")
    cy.request({
        method: 'POST',
        url: "/oauth/user/create",
        body: createNewUserJson,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('username', response.body.username)
    })

})

Cypress.Commands.add('api_createCluster', (clusterName, description, brand) => {
  
    cy.api_generateClientToken()
        .then((response) => {
            expect(response.status).to.equal(200)
            token = response.body.token

            cy.request({
                method: 'POST',
                url: "/catalogue/cluster",
                body: {
                    "name": clusterName,
                    "description": description,
                    "shortDescription": description,
                    "brand": brand
                },
                headers: { Authorization: 'Bearer ' + token }
            })
        })
})

Cypress.Commands.add('api_getScopes', () => {
    let token = Cypress.env("token")

    cy.request({
        method: 'GET',
        url: "/oauth/token/getScopes",
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_preReq', (typeClient) => {
    cy.api_createNewClient(typeClient)
    cy.api_generateClientToken()
})

Cypress.Commands.add('api_getUserInformationbyAuthorization', () => {
    let userToken = Cypress.env('userToken')
    cy.request({
        method: 'GET',
        url: '/oauth/user/me',
        headers: { Authorization: userToken }
    })
})
Cypress.Commands.add('api_createNewClientProfile', () => {
    let token = Cypress.env('token')
    cy.request({
        method: 'POST',
        url: '/oauth/client/profiles',
        headers: { Authorization: token },
        body: createNewClientProfile
    }).then((response) => {
        Cypress.env('profileId', response.body)
    })

})

Cypress.Commands.add('api_generateUserToken', (profile) => {

    let token = Cypress.env("token")
    let username = Cypress.env("username")
    cy.request({
        method: 'POST',
        url: "/oauth/user/token",
        body: {
            "username": username,
            "password": "admin1",
            "profile": profile
        },
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('userToken', 'Bearer ' + response.body.token)
    })
})

Cypress.Commands.add('api_generateRootToken', () => {

    cy.request({
        method: 'POST',
        url: "/oauth/client/token",
        body: {
            "clientId": "b25713ef-9b10-492d-ba43-ca1202c361f4",
            "clientSecret": "a8aafa9525213447b4b92f495929cc5c0c465878bba83dfe09ef9c887787710b"
        }
    })
})

Cypress.Commands.add('api_updatePasswordUser', () => {
    let userToken = Cypress.env("userToken")
    cy.request({
        method: 'PUT',
        url: "/oauth/user/updatePassword",
        body: updateUserPassword,
        headers: { Authorization: userToken }
    })
})

Cypress.Commands.add('api_generateRecoveryToken', () => {
    let token = Cypress.env("token")
    let userName = Cypress.env("userName")

    cy.request({
        method: 'GET',
        url: "/oauth/user/recoverPassword/" + userName,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('temporaryToken', response.body.temporaryToken)
    })
})

Cypress.Commands.add('api_getAllUserInformationbyClientAuthorization', () => {
    let token = Cypress.env('token')
    cy.request({
        method: 'GET',
        url: '/oauth/user',
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_handleRecoveryToken', () => {
    let token = Cypress.env("token")
    let newRecoveryToken = Cypress.env('temporaryToken')
    handleRecoverTokenJson.recoverToken = newRecoveryToken

    cy.request({
        method: 'POST',
        url: "/oauth/user/handleRecoverToken",
        body: handleRecoverTokenJson,
        headers: { Authorization: token }
    })
})

Cypress.Commands.add('api_generateRecoveryToken', () => {
    let token = Cypress.env("token")
    let username = Cypress.env('username')

    cy.request({
        method: 'GET',
        url: "/oauth/user/recoverPassword/" + username,
        headers: { Authorization: token }
    }).then((response) => {
        Cypress.env('temporaryToken', response.body.temporaryToken)
    })
})

Cypress.Commands.add('api_changeUserProfile', () => {
    let userToken = Cypress.env("userToken")

    cy.request({
        method: "POST",
        url: "/oauth/user/changeProfile",
        body: {
            "profile": "ADMIN"
        },
        headers: { Authorization: userToken }
    }).then((response) => {
        Cypress.env('userToken', 'Bearer ' + response.body.userToken)
    })
})