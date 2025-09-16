import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { recoveryPasswordPage } from '@pages/RecoveryPasswordPage'

When("clicar no link esqueci minha senha, informar o e-mail {string} e clicar em recuperar senha", (email) => {
    recoveryPasswordPage.submitRecoveryPassword(email)
    recoveryPasswordPage.elements.recoveryPasswordSubmit().click()
})

Then("deve retornar a mensagem {string} confirmando o envio do e-mail", (errorMessage) => {
    cy.checkMessageToastify(errorMessage)
})

Then("deve retornar a mensagem {string} informando que o usuário informando não foi encontrado", (errorMessage) => {
    cy.checkMessageToastify(errorMessage)
})

Then("tem que retornar mensagem {string}", (errorMessage) => {
    cy.generateUserInformations()
    recoveryPasswordPage.elements.errorMessage().should("have.text", errorMessage)
})