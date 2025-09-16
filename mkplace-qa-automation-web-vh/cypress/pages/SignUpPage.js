import { faker } from "@faker-js/faker";

class SignUpPage {
    elements = {
      nameInput: () => cy.getByTestId("sign-up-name-input"),
      documentInput: () => cy.getByTestId("sign-up-document-input"),
      birthdateInput: () => cy.getByTestId("sign-up-birthdate-input"),
      phoneInput: () => cy.getByTestId('sign-up-phone-input'),
      emailInput: () => cy.getByTestId('sign-up-email-input'),
      passwordInput: () => cy.getByTestId('sign-up-password-input'),
      passwordVerifyInput: () => cy.getByTestId('sign-up-passwordVerify-input'),
      signupButton: () => cy.get('#headlessui-tabs-tab-2 > span'),
      signupBtn: () => cy.get('[data-testid="sign-up-submit-button"]')
    };
    
  submitSignup(){
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