import { faker } from "@faker-js/faker"
import fakerbr from "faker-br/lib"

class AddressPage {

    elementsAddress = {
        tabAddress: () => cy.xpath('//*[contains(text(),"adicionar")]'),
        buttonAddAddress: () => cy.xpath('//*[contains(text(),"adicionar")]'),
        oldAddress: () => cy.xpath('//*[contains(text(),"Helder Fernandes")]'),
        btnEditAdress: () => cy.getByTestId('address-edit-icon'),
        inputAddressName: () => cy.getByTestId('input-receiverName'),
        inputZipCode: () => cy.getByTestId('input-zipcode'),
        selectState: () => cy.xpath('//*[@id="location"]'),
        inputCity: () => cy.getByTestId('input-city'),
        inputNeighborhood: () => cy.getByTestId('input-neighborhood'),
        inputStreet: () => cy.getByTestId('input-street'),
        inputAddressNumber: () => cy.getByTestId('input-addressNumber'),
        inputComplement: () => cy.getByTestId('input-complement'),
        buttonSubmitNewAdress: () => cy.getByTestId('button-add'),
        buttonEditNewAddress: () => cy.xpath('//*[contains(text(), "Endereço a ser editado")]'),
        AccessNewAddress: () => cy.xpath('//*[contains(text(), "Endereço editado com sucesso")]'),
        buttonDeleteAddress: () => cy.getByTestId('button-delete'),
    }

    addNewAddress() {

        let fakerName = faker.person.firstName()

        this.elementsAddress.buttonAddAddress().click()
        this.elementsAddress.inputAddressName().type(fakerName)
        this.elementsAddress.inputZipCode().type('07791060')
        this.elementsAddress.inputAddressNumber().type('123')
        this.elementsAddress.inputComplement().type('Casa')
        this.elementsAddress.buttonSubmitNewAdress().click()

    }

    editNewAddress(newAddressName, newAddressNumber, newComplement) {

        //Adicionando novo endereço para ser editado
        cy.wait(3000)
        this.elementsAddress.buttonAddAddress().click()
        this.elementsAddress.inputAddressName().type('Endereço a ser editado')
        this.elementsAddress.inputZipCode().type('07791060')
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
        this.elementsAddress.inputAddressNumber().type('123')
        this.elementsAddress.inputComplement().type('Casa')
        cy.wait(3000)
        this.elementsAddress.buttonSubmitNewAdress().click()

        cy.checkMessageToastify('Endereço adicionado')

        this.deleteAddress(cy.xpath('//*[contains(text(), "'+nameAddress+'")]'))
    }
}

export const addressPage = new AddressPage();