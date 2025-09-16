// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const loginJson = require('../fixtures/login.json')

const nome = ''

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

Cypress.Commands.add('getByTestId', (id) => cy.get(`[data-testid=${id}]`));
Cypress.Commands.add('checkMessageToastify', (message) =>
  cy
    .get('.Toastify__toast-container')
    .should('contain', message)
    .and('be.visible')
);

Cypress.Commands.add('generateUserInformations', () =>
  cy.request({
    method: 'POST',
    url: 'https://www.4devs.com.br/ferramentas_online.php',
    form: true,
    body: {
      acao: 'gerar_pessoa',
      sexo: 'M',
      pontuacao: 'N',
      txt_qtde: '1'
    }
  }).then((response) => {
    Cypress.env('nome', response.body.nome)
  })
);

Cypress.Commands.add('getARandonZipCode', () =>
  cy.request({
    method: 'POST',
    url: 'https://www.4devs.com.br/ferramentas_online.php',
    form: true,
    body: {
      acao: 'gerar_cep',
      cep_estado: 'SP',
      cep_cidade: '9015',
      somente_numeros: 'N'
    }
  }).then((response) => {
    const cepElement = Cypress.$('#cep', response.body);
    const cep = cepElement.find('span').text();
    Cypress.env('newCep', cep);
    cy.log('Esse é o novo cep ' + cep)
  })
);


Cypress.Commands.add('loginViaAPI', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}api/customer/login`,
    headers: { "Content-Type": "application/json" },
    body: loginJson
  }).then((response) => {
    localStorage.setItem('customerAccessToken', response.body.token);
    localStorage.setItem('sessionId',
      [...Array(64)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('')
    );
    Cypress.env('customerAccessToken', response.body.token);
    Cypress.env('sessionId', [...Array(64)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join(''));
  })
})

Cypress.Commands.add('addProductToShoppingCartApi', (quantidade) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}api/shoppingcart/addItem`,
    body: {
      selectedSellerId: "MN4YoInc6K",
      selectedSellerName: "MIBR",
      sellerSkuId: 'UN-MI-22-AZ-V1-P',
      skuId: "MKU-ik9YeqfAjO1Vg",
      qtd: quantidade,
      selectedSLA: null,
      metadata: {
        teste: "teste"
      }
    },
    headers: {
      'Customer-Access-Token': localStorage.getItem('customerAccessToken'),
      'Session-ID': localStorage.getItem('sessionId')
    }
  })
})

Cypress.Commands.add('removeProductFromShoppingCartApi', () => {
  cy.request({
    method: 'POST',
    url: `${Cypress.config('baseUrl')}api/shoppingcart/addItem`,
    body: {
      selectedSellerId: "QCkU3Vm8K6",
      selectedSellerName: "Victor Hugo",
      sellerSkuId: 'QCkU3Vm8K6',
      skuId: "MKU-4W5VhyPoahL9R",
      qtd: 0,
      selectedSLA: null,
      metadata: {
        teste: "teste"
      }
    },
    headers: {
      'Customer-Access-Token': localStorage.getItem('customerAccessToken'),
      'Session-ID': localStorage.getItem('sessionId')
    }
  })
})

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("saveLocalStorage", () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add("restoreLocalStorage", () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});


