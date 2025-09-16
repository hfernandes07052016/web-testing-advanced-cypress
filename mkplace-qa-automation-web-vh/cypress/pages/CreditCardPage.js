import { faker } from "@faker-js/faker"
import getCartaoNumero from "cypress/support/commands";
import { addressPage } from "./AddressPage";

class CreditCardPage {

    elementsCrediCard = {
        tabMyCards: () => cy.xpath('//span[contains(text(),"Meus cartões")]'),
        buttonAddNewCard: () => cy.xpath('//*[contains(text(),"adicionar")]'),
        inputCardName: () => cy.getByTestId('credit-card-holder-input'),
        inputCardNumber: () => cy.getByTestId('credit-card-number-input'),
        inputCardExpireDate: () => cy.getByTestId('credit-card-expireDate-input'),
        inputCardSecurityCode: () => cy.getByTestId('credit-card-securityCode-input'),
        buttonSubmitNewCard: () => cy.getByTestId('credit-card-submit-button'),
        selectAddress: () => cy.get('#billingAddress'),
        buttonViewCards: () => cy.getByTestId('credit-card-view-button'),
        ButtonEditNewCard: () => cy.xpath('//*[contains(text(),"Editar esse cartao")]'),
        buttonDeleteNewCard: () => cy.getByTestId('credit-card-delete-button'),

    }

    addnewCard() {

        let fakerName = faker.person.fullName();
        let fakerCVV = faker.finance.creditCardCVV();

        // Chame a função getCartaoNumero para obter o número do cartão
        getCartaoNumero().then((cartaoNumero) => {
            cy.wait(2000);
            this.elementsCrediCard.buttonAddNewCard().click();
            this.elementsCrediCard.inputCardName().type(fakerName);
            // Preencha o campo de número do cartão com o cartaoNumero retornado
            this.elementsCrediCard.inputCardNumber().type(cartaoNumero);
            this.elementsCrediCard.inputCardExpireDate().type('0530');
            this.elementsCrediCard.inputCardSecurityCode().type(fakerCVV);
            this.elementsCrediCard.selectAddress().select('Mkplace Address (Alameda Rio Negro)');
            cy.wait(2000)
        })
    }

    removeNewCardAfterAdd() {
        cy.xpath("//*[contains(text(),"+fakerName+")]").click()
        this.elementsCrediCard.buttonDeleteNewCard().click()
    }


    editNewCard() {

        let fakerCVV = faker.finance.creditCardCVV();

        // Chame a função getCartaoNumero para obter o número do cartão
        getCartaoNumero().then((cartaoNumero) => {
            cy.wait(2000);
            // Adicionando o cartão que será editado
            this.elementsCrediCard.buttonAddNewCard().click();
            this.elementsCrediCard.inputCardName().type("Editar esse cartão");
            this.elementsCrediCard.inputCardNumber().type(cartaoNumero);
            this.elementsCrediCard.inputCardExpireDate().type('0530');
            this.elementsCrediCard.inputCardSecurityCode().type(fakerCVV);
            this.elementsCrediCard.selectAddress().select('Helder Fernandes (Rua das Nogueiras)');
            this.elementsCrediCard.buttonSubmitNewCard().click();
        })

        cy.checkMessageToastify('Cartão adicionado com sucesso!')

        this.elementsCrediCard.ButtonEditNewCard().click()

        cy.wait(2000)

        // Editando endereço do cartão cadastrado
        addressPage.elementsAddress.inputZipCode().clear()
        addressPage.elementsAddress.inputZipCode().type('06454000')

        cy.wait(2000)

        addressPage.elementsAddress.selectState().select('São Paulo')
        addressPage.elementsAddress.inputCity().type('Barueri')
        addressPage.elementsAddress.inputNeighborhood().type('Alphaville')
        addressPage.elementsAddress.inputStreet().type('Alameda Rio Negro')
        addressPage.elementsAddress.inputAddressNumber().type('800')
        addressPage.elementsAddress.inputComplement().type('Casa')
        this.elementsCrediCard.buttonSubmitNewCard().click();

    }

    deletNewCard() {

        cy.wait(2000)

        this.elementsCrediCard.ButtonEditNewCard().click()
        this.elementsCrediCard.buttonDeleteNewCard().click()
    }

}

export const creditCardPage = new CreditCardPage();