import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { signUpPage } from '@pages/SignUpPage';
import { faker } from "@faker-js/faker";
import { sk } from "faker-br/lib/locales";

Given("que o usuario acessou a pagina de cadastro", () => {
    cy.visit('/store/register?previousPage=/home')
})

When("preencher todos os campos e clicar em cadastrar", (email) => {
    signUpPage.submitSignup()
    signUpPage.elements.SubmitSignupButton().click()
})

Then("o cadastro deverá ser concluido com sucesso e apresentada a mensagem {string}", (message) => {
    cy.checkMessageToastify(message)
})

When("preencher todos os campos exceto o campo {string} e clicar em cadastrar", (campo) => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    if ( campo=="Nome Completo" ) {
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.nameInput().click()
        signUpPage.elements.SubmitSignupButton().click()
    } else if ( campo == "E-mail") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.emailInput().click()
        signUpPage.elements.SubmitSignupButton().click()
    } else if (campo == "CPF") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.documentInput().click()
        signUpPage.elements.SubmitSignupButton().click()
    } else if (campo == "Telefone") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.phoneInput().click()
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().type("mkplace@2024")
        signUpPage.elements.SubmitSignupButton().click()
    } else if (campo == "Senha") {
        signUpPage.elements.nameInput().type(fakerName)
        signUpPage.elements.documentInput().type(meuCpf)
        signUpPage.elements.phoneInput().type("11956654555")
        signUpPage.elements.emailInput().type(fakerEmail)
        signUpPage.elements.passwordInput().click()
        signUpPage.elements.SubmitSignupButton().click()
    }
    signUpPage.elements.SubmitSignupButton()
})


Then("o cadastro deverá não deve ser concluído apresentando a mensagem {string} abaixo do campo {string}", (message, campo) => {
    var element = ""

    if ( campo == "Nome Completo" ) {
        element = '//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[1]/div[2]/p'
    } else if ( campo == 'E-mail') {
        element = '//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[3]/div[2]/p'
    } else if ( campo == 'CPF') {
        element = '//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[2]/div[1]/div[2]/p'
    } else if ( campo == 'Telefone') {
        element = '//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[2]/div[2]/div[2]/p'
    } else if ( campo == 'Senha') {
        element = '//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[4]/div[2]/p'
    }
    
    cy.xpath(element).contains(message).should('be.ok');
})

When("preencher o campo Nome Completo apenas com o nome {string}", (nome) => {
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();
    cy.wait(2000)
    signUpPage.elements.nameInput().type(nome)
    signUpPage.elements.documentInput().type(meuCpf)
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Nome Completo", (message) => {
    cy.xpath('//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[1]/div[2]/p').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo CPF", (message) => {
    cy.xpath('//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[2]/div[1]/div[2]/p').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Telefone", (message) => {
    cy.xpath('//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[2]/div[2]/div[2]/p').contains(message).should('be.ok')
})

Then("deve ser apresentada a mensagem {string} abaixo do campo Senha", (message) => {
    cy.xpath('//*[@id="__next"]/main/div/div/div[2]/div/form/div[1]/div[4]/div[2]/p').contains(message).should('be.ok')
})

When("preencher todos os campos mas informar um CPF invalido e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type("12345678901")
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.SubmitSignupButton().click()
})

When("preencher todos os campos mas informar um telefone invalido e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.phoneInput().type("11111111111")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.SubmitSignupButton().click()
})

When("preencher todos os campos mas informar uma senha apenas com números e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("123456789")
    signUpPage.elements.SubmitSignupButton().click()
})

When("preencher todos os campos mas informar uma senha com menos de 6 dígitos e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("123456789")
    signUpPage.elements.SubmitSignupButton().click()
})

When("preencher todos os campos mas informar senhas diferentes e clicar em cadastrar", () => {
    var fakerName = faker.person.fullName();
    var fakerEmail = faker.internet.email();
    var fakerbr = require('faker-br');
    let meuCpf = fakerbr.br.cpf();

    signUpPage.elements.nameInput().type(fakerName)
    signUpPage.elements.documentInput().type(meuCpf)
    signUpPage.elements.phoneInput().type("11956654555")
    signUpPage.elements.emailInput().type(fakerEmail)
    signUpPage.elements.passwordInput().type("mkplace@2024")
    signUpPage.elements.SubmitSignupButton().click()
})
