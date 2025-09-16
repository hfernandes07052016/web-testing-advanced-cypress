import {
    Given,
    When,
    Then,
} from "@badeball/cypress-cucumber-preprocessor";
import { searchPage } from '@pages/searchPage';
import { signinPage } from '@pages/SinginPage'

Given("que o usuario esteja na tela hoje do aplicativo", () => {
    cy.visit('/')
    cy.loginViaAPI()
    signinPage.aceitaCookie()
})

When("realizar a busca do produto {string}", (produto) => {

    searchPage.makeSearch(produto)
    cy.url().should('include', '/busca')
    cy.wait(3000)
})

Then("devem retornar mais de 4 cintos na conclusão da busca", () => {
    let contador = 0;
    cy.getByTestId('search-product-card').each(($el) => {
        $el.text().includes('Cinto')
        contador++;
        if (contador > 4) {
            return true;
        }
    });
})

When("acessar o filtro de busca e selecionar o check box large", () => {
    searchPage.searchFilter()
})

Then("devem ser apresentados todos os produtos que possuem o tamanho large", () => {
    let contador = 0;
    cy.getByTestId('search-product-card').each(($el) => {
        $el.text().includes('Small')
        contador++;
        if (contador > 4) {
            return true;
        }
    })
}) 