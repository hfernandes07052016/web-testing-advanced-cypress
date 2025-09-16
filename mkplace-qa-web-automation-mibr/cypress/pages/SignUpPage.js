import { faker } from "@faker-js/faker";

class SignUpPage {
  elements = {
    nameInput: () => cy.getByTestId("input-name"),
    documentInput: () => cy.getByTestId("input-document"),
    birthdateInput: () => cy.getByTestId("input-birthdate"),
    phoneInput: () => cy.getByTestId('input-phone'),
    emailInput: () => cy.getByTestId('input-email'),
    passwordInput: () => cy.getByTestId('input-password'),
    passwordVerifyInput: () => cy.getByTestId('input-passwordVerify'),
    signupButton: () => cy.get('#headlessui-tabs-tab-2'),
    signupBtn: () => cy.getByTestId('button-signup-submit')
  };

  submitSignup() {
    var fakerName = faker.person.fullName()
    var fakerEmail = faker.internet.email()
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    this.elements.nameInput().type(fakerName)
    this.elements.documentInput().type(meuCpf)
    this.elements.birthdateInput().type("10/04/1994")
    this.elements.phoneInput().type("11956654555")
    this.elements.emailInput().type(fakerEmail)
    this.elements.passwordInput().type("mkplace@2024")
    this.elements.passwordVerifyInput().type("mkplace@2024")
  }

  accessSignupFormulary() {
    this.elements.signupButton().click()
  }


}

export const signUpPage = new SignUpPage();