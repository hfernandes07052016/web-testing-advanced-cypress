import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { signinPage } from '@pages/SinginPage'

Given('que o customer acessou a página de login', () => {
    cy.visit("/store/access")
});

When("ele informar o email {string} e senha {string} e clicar no botão de acessar", (username, password) => {
    signinPage.submitLogin(username, password)
});

Then("deve visualizar a página inicial", () => {
    cy.wait(3000);

    cy.get(localStorage.getItem('customerAccessToken')).should('not.be.null');
    
    cy.wait(3000);

    cy.url().should('be.equal', `${Cypress.config('baseUrl')}store/my-orders`)
    signinPage.elements.logoutButton().click()
});

Then("deve visualizar a seguinte mensagem de erro {string}", (errorMessage) => {
    cy.checkMessageToastify(errorMessage)
})

When("ele informar o e-mail {string} e clica no botão de acessar sem informar a senha", (email) => {
    signinPage.typeUsername(email)
    signinPage.clickLogin
})

When("ele informar a senha {string} e clica no botão de acessar sem informar o e-mail", (password) => {
    signinPage.typePassword(password)
    signinPage.clickLogin
})

Then("deve visualizar a mensagem {string} abaixo do campo", (errorMessage) => {
    cy.getByTestId('sign-in-password-error').contains(errorMessage).should('be.ok')
})

When("ele clicar no botão de login sem informar o campo e-mail e senha", () => {
    signinPage.clickLogin
})

Then("deve visualizar uma mensagem {string} abaixos dos campos username e senha", (errorMessage) => {
    cy.getByTestId('sign-in-password-error').contains(errorMessage).should('be.ok')
    cy.getByTestId('sign-in-username-error').contains(errorMessage).should('be.ok')
})