import { faker } from "@faker-js/faker";

class CheckoutPage {
    elementsPayment = {
        btnNext: () => cy.xpath('//*[contains(text(), "Avançar")]'),
        cardAddress: () => cy.xpath('//*[contains(text(),"Helder Fernandes")]'),
        btnGoToPayment: () => cy.getByTestId("button-delivery-infos-payment"),
        btnAddCard: () => cy.xpath('//*[contains(text(), "adicionar")]'),
        btnAddCardFormulary: () => cy.getByTestId('button-add'),
        inputCardName: () => cy.getByTestId('input-holder'),
        inputCardNumber: () => cy.getByTestId('input-number'),
        inputCardExpireDate: () => cy.getByTestId('input-expireDate'),
        inputCardSecurityCode: () => cy.getByTestId('input-securityCode'),
        inputCardZipcode: () => cy.getByTestId('address-zipcode-input'),
        inputCardAddressNumber: () => cy.getByTestId('address-addressNumber-input'),
        inputCardComplement: () => cy.getByTestId('address-complement-input'),
        btnCardSubmit: () => cy.getByTestId('credit-card-submit-button'),
        btnPaymentSubmit: () => cy.getByTestId('button-finalize-purchase'),
        cardFinal9505: () => cy.xpath('//*[contains(text(),"Helder F Paula")]'),
        paymentCreditCardTitle: () => cy.getByTestId('payment-credit-card-title'),
        btnInvoicePayment: () => cy.getByTestId('payment-button-boleto'),
        btnPixPayment: () => cy.getByTestId('payment-button-pix'),

    };

    elementAddProduct = {
        searchButton: () => cy.getByTestId("button-header-search"),
        searchInput: () => cy.getByTestId("search-input-field"),
        searchOpenFilterButton: () => cy.getByTestId('search-open-filters-button'),
        searchFilterLargeButton: () => cy.getByTestId('search-filter-Large-checkbox'),
        searchFilterResultsButton: () => cy.getByTestId('search-filter-results-button'),
        productSelected: () => cy.xpath('//*[@id="__next"]/div/div/div/div[1]/div[3]/div/div[1]/div/a/div[1]'),
        agreeButton: () => cy.get('#headlessui-switch-9'),
        btnBuyNow: () => cy.getByTestId('button-buy'),
        acceptAllCookies: () => cy.get('#rcc-confirm-button')
    }

    elementShoppingCart = {
        btnSubtractItem: () => cy.get(':nth-child(3) > .flex-shrink-0'),
        btnIncreaseItem: () => cy.get('.flex-col > :nth-child(1) > .flex-shrink-0'),
        labelNumberOfProductsInTheCart: () => cy.get('.col-span-1 > .justify-between > .flex-col > :nth-child(2) > .text-sm'),
        returnToCart: () => cy.get('.mb-2 > .inline-flex'),
        usernameInput: () => cy.get('[data-testid="input-username"]'),
        passwordInput: () => cy.get('[data-testid="input-password"]'),
    }

    elemensAddress = {

    }

    addProductToCard(produto) {
        // Aceita todos os cookies
        if (this.elementAddProduct.acceptAllCookies().should('be.visible')) {
            this.elementAddProduct.acceptAllCookies().click()
        }
        this.elementAddProduct.searchButton().click()
        this.elementAddProduct.searchInput().type(produto)

        cy.wait(2000)

        this.elementAddProduct.productSelected().click()

        cy.wait(2000)
        
        this.elementAddProduct.btnBuyNow().click()
    }

    submitPaymentWithCard() {

        var fakerName = faker.person.fullName();

        cy.wait(3000)
        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
            this.elementsPayment.cardAddress().click()
            cy.wait(6000)
            this.elementsPayment.btnGoToPayment().click()
        } else {
            cy.wait(3000);
            this.elementsPayment.cardAddress().click()
            this.elementsPayment.btnGoToPayment().click()
        }

        cy.wait(6000);

        if (!this.elementsPayment.cardFinal9505().should('be.visible')) {
            this.elementsPayment.btnAddCard().contains('adicionar').click();

            cy.wait(3000);

            this.elementsPayment.inputCardName().focus().type(fakerName);
            this.elementsPayment.inputCardNumber().focus().type('5461672960719505');
            this.elementsPayment.inputCardExpireDate().focus().type('0425');
            this.elementsPayment.inputCardSecurityCode().focus().type('528');
            this.elementsPayment.inputCardZipcode().focus().type('07791210');
            this.elementsPayment.inputCardAddressNumber().focus().type('740');
            this.elementsPayment.inputCardComplement().focus().type('Casa');
            this.elementsPayment.btnAddCard().focus().click();

            cy.wait(3000);

            cy.checkMessageToastify('Cartão adicionado com sucesso!');
        }

        this.elementsPayment.cardFinal9505().click()
        this.elementsPayment.btnPaymentSubmit().click()

    }

    submitPaymentInInstallments() {
        cy.wait(6000);

        this.elementsPayment.cardAddress().click()
        this.elementsPayment.btnGoToPayment().click()

        cy.wait(6000);

        this.elementsPayment.cardFinal9505().click()

        // Selecionando a quantidade de parcelas
        cy.get('[data-testid="payment-installments-select"]').select(1)

        this.elementsPayment.btnPaymentSubmit().click()
    }

    submitPaymentWithInvoice() {
        cy.wait(3000)
        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
            this.elementsPayment.cardAddress().click()
            cy.wait(6000)
            this.elementsPayment.btnGoToPayment().click()
        } else {
            cy.wait(3000);
            this.elementsPayment.cardAddress().click()
            this.elementsPayment.btnGoToPayment().click()
        }

        cy.wait(6000);

        this.elementsPayment.btnInvoicePayment().click()
        this.elementsPayment.btnPaymentSubmit().click()
    }

    submitPaymentWithPix() {
        cy.wait(3000)
        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
            this.elementsPayment.cardAddress().click()
            cy.wait(6000)
            this.elementsPayment.btnGoToPayment().click()
        } else {
            cy.wait(3000);
            this.elementsPayment.cardAddress().click()
            this.elementsPayment.btnGoToPayment().click()
        }

        cy.wait(6000);

        this.elementsPayment.btnPixPayment().click()
        this.elementsPayment.btnPaymentSubmit().click()
    }

    addExpiredCardFormulary() {

        var fakerName = faker.person.fullName();

        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
        }

        cy.wait(3000);
        this.elementsPayment.cardAddress().click()
        this.elementsPayment.btnGoToPayment().click()

        cy.wait(3000);
        this.elementsPayment.btnAddCard().click()

        cy.wait(3000);

        this.elementsPayment.inputCardName().focus().type(fakerName);
        this.elementsPayment.inputCardNumber().focus().type('5461672960719505');
        this.elementsPayment.inputCardExpireDate().focus().type('0422');
        this.elementsPayment.inputCardSecurityCode().focus().type('528');
        cy.get('#billingAddress').select("Helder Fernandes (Rua das Nogueiras)")
        this.elementsPayment.btnAddCardFormulary().focus().click();
    }

    addNewCard() {
        var fakerName = faker.person.fullName()
        var fakerCardNumber = faker.finance.creditCardNumber()
        var fakerCardCVV = faker.finance.creditCardCVV()

        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
        }

        cy.wait(3000);
        this.elementsPayment.cardAddress().click()
        this.elementsPayment.btnGoToPayment().click()

        cy.wait(3000);
        this.elementsPayment.btnAddCard().click()

        cy.wait(3000);

        this.elementsPayment.inputCardName().focus().type(fakerName);
        this.elementsPayment.inputCardNumber().focus().type(fakerCardNumber);
        this.elementsPayment.inputCardExpireDate().focus().type('0530');
        this.elementsPayment.inputCardSecurityCode().focus().type(fakerCardCVV);
        cy.get('#billingAddress').select("Helder Fernandes (Rua das Nogueiras)")
        this.elementsPayment.btnAddCardFormulary().focus().click();
    }
}

export const checkoutPage = new CheckoutPage();