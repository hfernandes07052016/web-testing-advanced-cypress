import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { creditCardPage } from "@pages/CreditCardPage";
import { addressPage } from "@pages/AddressPage";
import { faker } from "@faker-js/faker";
import getCartaoNumero from "cypress/support/commands";

// ############################################################################################################################## //
// Scenario: Validar adição de novo Cartão de Crédito com sucesso
Given("que o usuário esteja logado, e acessar a tela de Meus Cartões", () => {
    cy.loginViaAPI()
    cy.visit('/')
    cy.visit('/store/my-cards')
})

Then("devem ser visualizados os cartões já cadastrados, e o botão Adicionar um novo Cartão", () => {
    creditCardPage.elementsCrediCard.buttonAddNewCard().should('be.visible')
    creditCardPage.elementsCrediCard.tabMyCards().should('be.visible')
})
// ############################################################################################################################## //
// Scenario: Validar adição de novo Cartão de Crédito com sucesso
When("adicionar um novo Cartão com sucesso", () => {
    creditCardPage.addnewCard()
    creditCardPage.elementsCrediCard.buttonSubmitNewCard().click();
})

Then("devem ser visualizado o novo cartão cadastrado e a mensagem {string}", (message) => {
    cy.checkMessageToastify(message)
})

// ############################################################################################################################## //
// Scenario: Validar botão de Ver cartões ao tentar cadastrar novo cartão
When("insira todos os dados do cartão e clicar em Ver cartões", () => {
    creditCardPage.addnewCard()
    creditCardPage.elementsCrediCard.buttonViewCards().click();
})

// ############################################################################################################################## //
// Scenario: Validar cadastro de cartão sem informar nenhum campo
When("clicar em Adicionar cartão sem informar nenhum campo", () => {
    cy.wait(2000)
    creditCardPage.elementsCrediCard.buttonAddNewCard().click();
    creditCardPage.elementsCrediCard.buttonSubmitNewCard().click();
})

Then("deve ser apresentada a mensagen {string} informandos a obrigatoriedade dos campos", (message) => {
    cy.getByTestId('credit-card-holder-error').contains(message);
    cy.getByTestId('credit-card-number-error').contains(message);
    cy.getByTestId('credit-card-expireDate-error').contains(message);
    cy.getByTestId('credit-card-securityCode-error').contains(message);
    cy.getByTestId('address-zipcode-error').contains(message);
    cy.getByTestId('address-state-error').contains(message);
    cy.getByTestId('address-city-error').contains(message);
    cy.getByTestId('address-neighborhood-error').contains(message);
    cy.getByTestId('address-street-error').contains(message);
    cy.getByTestId('address-addressNumber-error').contains(message);
})

// ############################################################################################################################## //
// Scenario: Validar edição de cartão cadastrado
When("editar um cartão com sucesso alterando seu endereço e clicar em salvar", () => {
    cy.wait(2000)
    creditCardPage.editNewCard()
})

Then("deve ser apresentada a mensagen {string}", (message) => {
    cy.checkMessageToastify(message)
    creditCardPage.deletNewCard()
})

// ############################################################################################################################## //
// Scenario: Validar edição de cartão cadastrado deixando os campos de endereço em branco
When("editar um cartão deixando os campos do endereço em branco e clicar em salvar", () => {
    let fakerCVV = faker.finance.creditCardCVV();

    getCartaoNumero().then((cartaoNumero) => {
        cy.wait(2000);
        creditCardPage.elementsCrediCard.buttonAddNewCard().click();
        creditCardPage.elementsCrediCard.inputCardName().type('Editar sem endereço');
        // Preencha o campo de número do cartão com o cartaoNumero retornado
        creditCardPage.elementsCrediCard.inputCardNumber().type(cartaoNumero);
        creditCardPage.elementsCrediCard.inputCardExpireDate().type('0530');
        creditCardPage.elementsCrediCard.inputCardSecurityCode().type(fakerCVV);
        creditCardPage.elementsCrediCard.selectAddress().select('Helder Fernandes (Rua das Nogueiras)');
        creditCardPage.elementsCrediCard.buttonSubmitNewCard().click();

        cy.checkMessageToastify('Cartão adicionado com sucesso!')

        cy.xpath('//*[contains(text(), "Editar sem endereco")]').click()

        cy.wait(2000)

        // Editando endereço do cartão cadastrado
        addressPage.elementsAddress.inputZipCode().clear()
        addressPage.elementsAddress.inputZipCode().type('06454000')

        cy.wait(2000)


        addressPage.elementsAddress.inputCity().clear()
        addressPage.elementsAddress.inputNeighborhood().clear()
        addressPage.elementsAddress.inputStreet().clear()
        addressPage.elementsAddress.inputAddressNumber().clear()
        addressPage.elementsAddress.inputComplement().clear()
        creditCardPage.elementsCrediCard.buttonSubmitNewCard().click();

    })
})

Then("deve ser apresentada a mensagen {string} abaixo dos campos em branco", (message) => {

    cy.wait(2000)

    cy.getByTestId('address-city-error').contains(message);
    cy.getByTestId('address-neighborhood-error').contains(message);
    cy.getByTestId('address-street-error').contains(message);
    cy.getByTestId('address-addressNumber-error').contains(message);

    creditCardPage.elementsCrediCard.buttonDeleteNewCard().click()
})