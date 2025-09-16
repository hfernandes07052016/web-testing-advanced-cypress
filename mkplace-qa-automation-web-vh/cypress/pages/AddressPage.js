import { faker } from "@faker-js/faker"
import fakerbr from "faker-br/lib"

class AddressPage {

    elementsAddress = {
        tabAddress: () => cy.xpath('//*[contains(text(),"adicionar")]'),
        buttonAddAddress: () => cy.xpath('//*[contains(text(),"adicionar")]'),
        oldAddress: () => cy.xpath('//*[contains(text(),"Mkplace Address")]'),
        btnEditAdress: () => cy.getByTestId('address-edit-icon'),
        inputAddressName: () => cy.getByTestId('address-receiverName-input'),
        inputZipCode: () => cy.getByTestId('address-zipcode-input'),
        selectState: () => cy.xpath('//*[@id="location"]'),
        inputCity: () => cy.getByTestId('address-city-input'),
        inputNeighborhood: () => cy.getByTestId('address-neighborhood-input'),
        inputStreet: () => cy.getByTestId('address-street-input'),
        inputAddressNumber: () => cy.getByTestId('address-addressNumber-input'),
        inputComplement: () => cy.getByTestId('address-complement-input'),
        buttonSubmitNewAdress: () => cy.getByTestId('address-submit-button'),
        buttonEditNewAddress: () => cy.xpath('//*[contains(text(), "Endereço a ser editado")]'),
        AccessNewAddress: () => cy.xpath('//*[contains(text(), "Endereço editado com sucesso")]'),
        buttonDeleteAddress: () => cy.getByTestId('address-delete-button'),
    }

    addNewAddress() {

        let fakerName = faker.person.firstName()

        this.elementsAddress.buttonAddAddress().click()
        this.elementsAddress.inputAddressName().type(fakerName)
        this.elementsAddress.inputZipCode().type('07791060')

        cy.wait(2000)

        this.elementsAddress.selectState().select('São Paulo')
        this.elementsAddress.inputCity().type('Barueri')
        this.elementsAddress.inputNeighborhood().type('Alphaville')
        this.elementsAddress.inputStreet().type('Alameda Rio Negro')
        this.elementsAddress.inputAddressNumber().type('800')
        this.elementsAddress.inputComplement().type('Casa')
        this.elementsAddress.buttonSubmitNewAdress().click()

        cy.xpath("//*[contains(text(), '"+fakerName+"')]").click()
        
        cy.wait(3000)

        this.elementsAddress.buttonDeleteAddress().click()

        cy.checkMessageToastify('Endereço deletado')

    }

    editNewAddress(newAddressName, newAddressNumber, newComplement) {

        //Adicionando novo endereço para ser editado
        cy.wait(3000)
        this.elementsAddress.buttonAddAddress().click()
        this.elementsAddress.inputAddressName().type('Endereço a ser editado')
        this.elementsAddress.inputZipCode().type('07791060')
        this.elementsAddress.selectState().select('São Paulo')
        this.elementsAddress.inputCity().type('Barueri')
        this.elementsAddress.inputNeighborhood().type('Alphaville')
        this.elementsAddress.inputStreet().type('Alameda Rio Negro')
        this.elementsAddress.inputAddressNumber().type('123')
        this.elementsAddress.inputComplement().type('Casa')
        this.elementsAddress.buttonSubmitNewAdress().click()

        cy.checkMessageToastify('Endereço adicionado')

        // Editando o endereço editado
        this.elementsAddress.buttonEditNewAddress().click()
        this.elementsAddress.inputAddressName().clear()
        this.elementsAddress.inputAddressName().type(newAddressName)
        this.elementsAddress.inputZipCode().type('07791210')
        this.elementsAddress.inputAddressNumber().clear()
        this.elementsAddress.inputAddressNumber().type(newAddressNumber)
        this.elementsAddress.inputComplement().clear()
        this.elementsAddress.inputComplement().type(newComplement)
        this.elementsAddress.buttonSubmitNewAdress().click()

        cy.checkMessageToastify('Endereço atualizado')

    }

    deleteAddress(addressDeleted) {
        addressDeleted.click()

        cy.wait(3000)

        this.elementsAddress.buttonDeleteAddress().click()

        cy.checkMessageToastify('Endereço deletado')
    }

    addNewAddressToDeleteAfter(nameAddress) {
        //Adicionando novo endereço para ser editado
        cy.wait(3000)
        this.elementsAddress.buttonAddAddress().click()
        this.elementsAddress.inputAddressName().type(nameAddress)
        this.elementsAddress.inputZipCode().type('07791060')
        this.elementsAddress.selectState().select('São Paulo')
        this.elementsAddress.inputCity().type('Barueri')
        this.elementsAddress.inputNeighborhood().type('Alphaville')
        this.elementsAddress.inputStreet().type('Alameda Rio Negro')
        this.elementsAddress.inputAddressNumber().type('123')
        this.elementsAddress.inputComplement().type('Casa')
        this.elementsAddress.buttonSubmitNewAdress().click()

        cy.checkMessageToastify('Endereço adicionado')

        this.deleteAddress(cy.xpath('//*[contains(text(), "' + nameAddress + '")]'))
    }
}

export const addressPage = new AddressPage();