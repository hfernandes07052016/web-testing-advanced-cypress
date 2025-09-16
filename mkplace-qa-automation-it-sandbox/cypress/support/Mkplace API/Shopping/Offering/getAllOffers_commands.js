

Cypress.Commands.add('api_getAllOffers', () => {
    let token = Cypress.env("access_token")

    cy.request({
        method: 'GET',
        url: 'https://itau-stg.mkplace.com.br/store/offer',
        headers: { Authorization: "Bearer "+token }
    }).then((response) => {
        expect(response.status).to.eq(200)

        const data = response.body.docs

        if (Array.isArray(data)) {
            // Função para validar os campos
            const isValidItem = (item) => {
              return item?.isActive === true && item?.isAvailable === true && item?.stockBalance !== 0;
            };
  
            // Encontrando o primeiro item válido
            const firstValidItem = data.find(isValidItem);
  
            // Capturando o skuId do primeiro item válido
            const skuId = firstValidItem ? firstValidItem.skuId : null;
            const idOffer = firstValidItem ? firstValidItem._id : null;
            const stockBalance = firstValidItem ? firstValidItem.stockBalance : null;
  
            // Exibindo o skuId no console
            cy.log('skuId do primeiro item válido:', skuId);
            cy.log('_id do primeiro item válido:', idOffer);
            cy.log('stockBalance do primeiro item válido:', stockBalance);

            if (skuId && idOffer && stockBalance) {
                Cypress.env('skuId', skuId);
                Cypress.env('idOffer', idOffer);
                Cypress.env('stockBalance', stockBalance);
            }
  
            // Opcional: Verificando se um skuId válido foi encontrado
            expect(skuId).to.not.be.null;
          } else {
            throw new Error('A resposta não é um array.');
        }
    })
})