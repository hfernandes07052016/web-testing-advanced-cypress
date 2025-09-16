import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { signUpPage } from '@pages/SignUpPage';
import { faker } from "@faker-js/faker";
import { sk } from "faker-br/lib/locales";

Given("que o usuario acessou a pagina de cadastro", () => {
    cy.visit('/store/access')
    signUpPage.accessSignupFormulary()
})

When("preencher todos os campos e clicar em cadastrar", (email) => {
    signUpPage.submitSignup()
    signUpPage.elements.signupBtn().click()
})

Then("o cadastro deverá ser concluido com sucesso e apresentada a mensagem {string}", (message) => {
    cy.checkMessageToastify(message)
})

When("preencher todos os campos exceto o campo {string} e clicar em cadastrar", (campo) => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    if ( campo=="nome" ) {
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.birthdateInput().type("10/04/1994")
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
        signUpPage.elements.signupBtn().click()
    } else if ( campo == "email") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.birthdateInput().type("10/04/1994")
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
        signUpPage.elements.signupBtn().click()
    } else if (campo == "cpf") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.birthdateInput().type("10/04/1994")
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
        signUpPage.elements.signupBtn().click()
    } else if (campo == "aniversario") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
    }
    signUpPage.elements.signupBtn()
})


Then("o cadastro deverá não deve ser concluído apresentando a mensagem {string} abaixo do campo {string}", (message, campo) => {
    var element = ""

    if ( campo == "nome" ) {
        element = 'sign-up-name-error'
    } else if ( campo == 'email') {
        element = 'sign-up-email-input'
    } else if ( campo == 'cpf') {
        element = 'sign-up-document-input'
    } else if ( campo == 'aniversario') {
        element = 'sign-up-birthdate-error'
    }
    
    cy.getByTestId(element).contains(message).should('be.ok');
})

When("preencher o campo Nome Completo apenas com o nome {string}", (nome) => {
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();
    cy.wait(2000)
    signUpPage.elements.nameInput().type(nome)
    signUpPage.elements.documentInput().type(meuCpf)
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Nome Completo", (message) => {
    cy.getByTestId('sign-up-name-error').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo CPF", (message) => {
    cy.getByTestId('sign-up-document-error').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Telefone", (message) => {
    cy.getByTestId('sign-up-phone-error').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Senha", (message) => {
    cy.getByTestId('sign-up-password-error').contains(message).should('be.ok')
})

When("preencher todos os campos mas informar um CPF invalido e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type("12345678901")
    signUpPage.elements.birthdateInput().type("10/04/1994")
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
    signUpPage.elements.signupBtn().click()
})

When("preencher todos os campos mas informar um telefone invalido e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.birthdateInput().type("10/04/1994")
    signUpPage.elements.phoneInput().type("00000000000")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.passwordVerifyInput().type("mkplace@2024")
    signUpPage.elements.signupBtn().click()
})

When("preencher todos os campos mas informar uma senha fora do padrão e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.birthdateInput().type("10/04/1994")
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mk24")
    signUpPage.elements.passwordVerifyInput().type("mk24")
    signUpPage.elements.signupBtn().click()
})

When("preencher todos os campos mas informar senhas diferentes e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.birthdateInput().type("10/04/1994")
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.passwordVerifyInput().type("mkplace@2023")
    signUpPage.elements.signupBtn().click()
})
