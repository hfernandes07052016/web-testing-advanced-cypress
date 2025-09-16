import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { checkoutPage } from '@pages/CheckoutPage'
import { faker } from "@faker-js/faker";

// ############################################################################################################################## //
// Scenario: Validar compra com cartão de Crédito
Given("que o usuário adiciona um ou mais itens ao carrinho", () => {
    cy.loginViaAPI()
    cy.visit('/')
    checkoutPage.addProductToCard('camisa')
})

When("finalizar a compra", () => {
    cy.visit('/store/shopping-cart')
    checkoutPage.submitPaymentWithCard()
})

Then("a compra deve ser concluída com sucesso apresentando a seguinte mensagem {string}", (message) => {
    cy.xpath('//*[@id="__next"]/div/div/div/div[1]/div[2]/div/div[4]/div[2]/section/p').contains(message).should('be.ok')
})

// ############################################################################################################################## //
// Scenario: Validar compra com cartão vencido
Given("que o usuário esteja com o carrinho vazio", () => {
    cy.loginViaAPI()
    cy.visit('/')
    cy.removeProductFromShoppingCartApi()
})

When("acessar o carrinho", () => {
    cy.visit('/store/shopping-cart')

    if (checkoutPage.elementAddProduct.acceptAllCookies().should('be.visible')) {
        checkoutPage.elementAddProduct.acceptAllCookies().click()
    }

    checkoutPage.elementsPayment.btnNext().should('be.visible')
})

When("seleciona opção para pagamento no boleto e finaliza a compra", () => {
    cy.visit('/store/shopping-cart')
    checkoutPage.submitPaymentWithInvoice()
})

When("seleciona opção para pagamento no pix e finaliza a compra", () => {
    cy.visit('/store/shopping-cart')
    checkoutPage.submitPaymentWithPix()
})
// ############################################################################################################################## //
// Scenario: Validar compra no cartão de crédito de forma parcelada
When("selecionar a quantidade de parcelas e finalizar a compra", () => {
    checkoutPage.submitPaymentInInstallments()
})

// ############################################################################################################################## //
// Scenario: Validar a adição de novo cartão de crédito
When("a adição de um cartão novo", () => {
    cy.visit('/store/shopping-cart')
    checkoutPage.addNewCard()
})

Then("o cartão deve ser salvo com sucesso e a mensagem {string} será apresentada", (message) => {
    cy.checkMessageToastify(message)
})

// ############################################################################################################################## //
// Scenario: Validar compra com cartão vencido
When("a adição de um cartão vencido", () => {
    cy.visit('/store/shopping-cart')
    checkoutPage.addExpiredCardFormulary()
})

Then("a compra não deve ser concluída com sucesso e a mensagem {string} será apresentada", (message) => {
    cy.checkMessageToastify(message)
})

Then("o botão de avançar deve estar inativo e não deve ser possível prosseguir", () => {
    checkoutPage.elementsPayment.btnNext().should('be.disabled')
})

Then("as informações do pagamento via boleto exibidas ao usuário concluir o pagamento", () => {
    cy.xpath('//*[contains(text(), "Pagamento via boleto bancário")]').should('be.visible')
    cy.xpath('//*[contains(text(), "Pague o boleto em uma agência bancária ou no seu app do banco.")]').should('be.visible')
    cy.xpath('//*[contains(text(), "Imprimir boleto")]').should('be.visible')
})

Then("as informações com QR code do pagamento via pix exibidas ao usuário concluir o pagamento", () => {
    cy.xpath('//*[contains(text(), "Pagamento via PIX")]').should('be.visible')
    cy.xpath('//*[contains(text(), "Escaneie o código usando o app do seu banco para pagar ou use o PIX copia e cola.")]').should('be.visible')
    cy.xpath('//*[contains(text(), "copiar código")]').should('be.visible')
})

Given("que o usuário tem produtos no carrinho", () => {
    cy.loginViaAPI()
    cy.visit('/')
    cy.addProductToShoppingCartApi(3)
})

When("acessa o checkout, volta para o carrinho e seleciona a opção de remover o produto do carrinho", () => {
    cy.visit('/store/shopping-cart')

    if (checkoutPage.elementAddProduct.acceptAllCookies().should('be.visible')) {
        checkoutPage.elementAddProduct.acceptAllCookies().click()
    }

    checkoutPage.elementsPayment.btnNext().click()

    // Indo para o pagamento
    cy.wait(3000)
    checkoutPage.elementsPayment.btnGoToPayment().click()

    // Retornando pro Carrinho
    cy.wait(3000)
    checkoutPage.elementShoppingCart.returnToCart().click()
})

Then("o produto é removido do carrinho, o valor total é atualizado de acordo e deve ser possível realizar o pagamento", () => {
    // Removendo um item do carrinho
    cy.wait(3000)
    checkoutPage.elementShoppingCart.btnSubtractItem().click()
})

// ############################################################################################################################## //
// Scenario: Validar a adição de produtos no checkout
Given("que o usuário tem 1 produto no carrinho", () => {
    cy.loginViaAPI()
    cy.visit('/')
    cy.removeProductFromShoppingCartApi()
    checkoutPage.addProductToCard('camisa')
    cy.visit('/store/shopping-cart')
    cy.wait(3000)
    checkoutPage.elementsPayment.btnNext().click()
})

When("acessa o checkout, volta para o carrinho e seleciona a opção de aumentar a quantidade de um dos produtos", () => {
    // Indo para o pagamento
    cy.wait(3000)
    checkoutPage.elementsPayment.btnGoToPayment().click()

    // Retornando pro Carrinho
    cy.wait(3000)
    checkoutPage.elementShoppingCart.returnToCart().click()

    // Aumentando a quantidade do produto
    cy.wait(6000)
    checkoutPage.elementShoppingCart.btnIncreaseItem().click()
})

Then("a quantidade sera igual a {string}, o valor total é atualizado de acordo e deve ser possível realizar o pagamento", (quantity) => {
    checkoutPage.elementShoppingCart.labelNumberOfProductsInTheCart().contains(quantity + 'x')
})

// ############################################################################################################################## //
// Scenario: Validar a criação de pedido com um usuário deslogado
Given("que o usuário não esteja logado", () => {
    cy.visit('/')
    checkoutPage.addProductToCard('bolsa')
})

When("adiciona produtos no carrinho, preenche o endereço e tenta finalizar a compra", () => {
    cy.wait(3000)
    checkoutPage.elementsPayment.btnNext().click()
})

Then("deve ser solicitado que o usuário faça login ou se registre antes de prosseguir com o checkout", () => {
    checkoutPage.elementShoppingCart.usernameInput().should('be.visible')
    checkoutPage.elementShoppingCart.passwordInput().should('be.visible')
})

// ############################################################################################################################## //