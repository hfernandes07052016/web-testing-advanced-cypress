import { faker } from "@faker-js/faker";

class SignUpPage {
    elements = {
      nameInput: () => cy.get('#name'),
      documentInput: () => cy.get('#document'),
      phoneInput: () => cy.get('#phone'),
      emailInput: () => cy.get('#email'),
      passwordInput: () => cy.get('#password'),
      signupButton: () => cy.xpath('//*[@id="__next"]/main/div/div/div[2]/div/div[4]/p'),
      SubmitSignupButton: () => cy.get('.hidden > .styles_polygon__Xp_5L > .flex > p')
    };
    
  submitSignup(){
    var fakerName = faker.person.fullName()
    var fakerEmail = faker.internet.email()
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();
    
    this.elements.nameInput().type(fakerName)
    this.elements.documentInput().type(meuCpf)
    this.elements.phoneInput().type("11956654555")
    this.elements.emailInput().type(fakerEmail)
    this.elements.passwordInput().type("mkplace@2024")
  }
  
  accessSignupFormulary() {
    this.elements.signupButton().click()
  }

  
}
 
export const signUpPage = new SignUpPage();