import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { addressPage } from "@pages/AddressPage";
import { faker } from "@faker-js/faker";

// ############################################################################################################################## //
// Scenario: Validar acesso a sessão de endereços
Given("que o usuário esteja logado, e acessar a tela de endereços", () => {
    cy.loginViaAPI()
    cy.visit('/')
    cy.visit('/store/my-addresses')
})

Then("devem ser visualizados os endereços já cadastrados, e o botão Adicionar um endereço", () => {
    cy.get(addressPage.elementsAddress.btnEditAdress).should('be.visible')
    cy.get(addressPage.elementsAddress.oldAddress).should('be.visible')
    cy.get(addressPage.elementsAddress.tabAddress).should('be.visible')
})

// ############################################################################################################################## //
// Scenario: Validar adição de novo endereço com sucesso

When("adicionar um novo endereço com sucesso", () => {
    cy.wait(3000)
    addressPage.addNewAddress()
})

Then("devem ser visualizado o novo endereço cadastrado e a mensagem {string}", (mensagem) => {
    cy.checkMessageToastify(mensagem)
})

// ############################################################################################################################## //
// Scenario: Validar adição de novo endereço sem informar Nome do destinatário
// Scenario: Validar adição de novo endereço sem informar CEP
// Scenario: Validar adição de novo endereço sem informar Cidade
// Scenario: Validar adição de novo endereço sem informar Bairro
// Scenario: Validar adição de novo endereço sem informar Endereço
// Scenario: Validar adição de novo endereço sem informar Numero

When("adicionar um novo endereço sem informar o campo {string}", (campo) => {

    let fakerName = faker.person.firstName()

    cy.wait(2000)

    if (campo == 'Nome do destinário') {
        addressPage.elementsAddress.buttonAddAddress().click()
        addressPage.elementsAddress.inputZipCode().type('07791060')
        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputAddressNumber().type('500')
        addressPage.elementsAddress.inputComplement().type('Casa')
        addressPage.elementsAddress.buttonSubmitNewAdress().click()
    } else if (campo == 'Cidade') {
        addressPage.elementsAddress.buttonAddAddress().click()
        addressPage.elementsAddress.inputAddressName().type(fakerName)
        addressPage.elementsAddress.inputZipCode().type('07791060')
        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputCity().type('Barueri')
        addressPage.elementsAddress.inputCity().clear()
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputAddressNumber().type('123')
        addressPage.elementsAddress.inputComplement().type('Casa')
        addressPage.elementsAddress.buttonSubmitNewAdress().click()
    } else if (campo == 'Bairro') {
        addressPage.elementsAddress.buttonAddAddress().click()
        addressPage.elementsAddress.inputAddressName().type(fakerName)
        addressPage.elementsAddress.inputZipCode().type('07791060')
        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputCity().type('Barueri')
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputNeighborhood().clear()
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputAddressNumber().type('123')
        addressPage.elementsAddress.inputComplement().type('Casa')
        addressPage.elementsAddress.buttonSubmitNewAdress().click()
    } else if (campo == 'Endereço') {
        addressPage.elementsAddress.buttonAddAddress().click()
        addressPage.elementsAddress.inputZipCode().type('07791060')
        addressPage.elementsAddress.inputAddressName().type(fakerName)
        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputCity().type('Barueri')
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputStreet().clear()
        addressPage.elementsAddress.inputAddressNumber().type('123')
        addressPage.elementsAddress.inputComplement().type('Casa')
        addressPage.elementsAddress.buttonSubmitNewAdress().click()
    } else if (campo == 'Numero') {
        addressPage.elementsAddress.buttonAddAddress().click()
        addressPage.elementsAddress.inputZipCode().type('07791060')
        addressPage.elementsAddress.inputAddressName().type(fakerName)
        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputCity().type('Barueri')
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputAddressNumber().type('123')
        addressPage.elementsAddress.inputAddressNumber().clear()
        addressPage.elementsAddress.inputComplement().type('Casa')
        addressPage.elementsAddress.buttonSubmitNewAdress().click()
    }

})

Then("deve ser apresentada a mensagem {string} no campo {string}", (message, campo) => {
    if (campo == 'Nome do destinatário') {
        cy.getByTestId('address-receiverName-error').contains(message)
    } else if (campo == 'Cidade') {
        cy.getByTestId('address-city-error').contains(message)
    } else if (campo == 'Bairro') {
        cy.getByTestId('address-neighborhood-error').contains(message)
    } else if (campo == 'Endereço') {
        cy.getByTestId('address-street-error').contains(message)
    } else if (campo == 'Numero') {
        cy.getByTestId('address-addressNumber-error').contains(message)
    }
})

// ############################################################################################################################## //
// Scenario: Validar edição de endereço com sucesso
When("acessar um dos endereços para edição e realizar a edição do nome para {string}, número {string} e Complemento {string}", (newAddressName, newAddressNumber, newComplement) => {
    addressPage.editNewAddress(newAddressName, newAddressNumber, newComplement)
})

Then("o endereço editado deve ser apresentado na tela de endereço com o nome {string}, número {string} e Complemento {string}", (newAddressName, newAddressNumber, newComplement) => {
    cy.xpath('//*[contains(text(), "' + newAddressName + '")]').should('be.visible')
    cy.xpath('//*[contains(text(), "' + newComplement + '")]').should('be.visible')

    // Removendo endereço após o teste

    addressPage.deleteAddress(addressPage.elementsAddress.AccessNewAddress())
})

// ############################################################################################################################## //
// Scenario: Validar exclusão de endereço com sucesso
When("acessar o endereço com o nome {string} e clicar em Deletar endereço", (addressName) => {
    addressPage.addNewAddressToDeleteAfter(addressName)
})

Then("o endereço não deve ser mais apresentado nos endereços cadastrados", () => {
    cy.xpath('//*[contains(text(), "Endereço a ser excluído")]').should('not.exist')
})

// ############################################################################################################################## //
// Scenario: Validar exclusão de endereço com sucesso