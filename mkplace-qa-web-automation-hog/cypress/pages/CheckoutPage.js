import { faker } from "@faker-js/faker";

class CheckoutPage {
    elementsPayment = {
        btnNext: () => cy.xpath('//*[contains(text(), "Avançar")]'),
        cardAddress: () => cy.getByTestId('address-card-07791-210-740'),
        btnGoToPayment: () => cy.getByTestId("shopping-cart-payment-button"),
        btnAddCard: () => cy.xpath('//*[contains(text(), "adicionar")]'),
        btnAddCardFormulary: () => cy.getByTestId('credit-card-submit-button'),
        inputCardName: () => cy.getByTestId('credit-card-holder-input'),
        inputCardNumber: () => cy.getByTestId('credit-card-number-input'),
        inputCardExpireDate: () => cy.getByTestId('credit-card-expireDate-input'),
        inputCardSecurityCode: () => cy.getByTestId('credit-card-securityCode-input'),
        inputCardZipcode: () => cy.getByTestId('address-zipcode-input'),
        inputCardAddressNumber: () => cy.getByTestId('address-addressNumber-input'),
        inputCardComplement: () => cy.getByTestId('address-complement-input'),
        btnCardSubmit: () => cy.getByTestId('credit-card-submit-button'),
        btnPaymentSubmit: () => cy.getByTestId('payment-submit-button'),
        cardFinal9398: () => cy.getByTestId('credit-card-block-9398'),
        paymentCreditCardTitle: () => cy.getByTestId('payment-credit-card-title'),
        btnInvoicePayment: () => cy.getByTestId('payment-boleto-tab'),
        btnPixPayment: () => cy.getByTestId('payment-pix-tab'),

    };

    elementAddProduct = {
        searchButton: () => cy.getByTestId("search-header-button"),
        searchInput: () => cy.getByTestId("search-input-field"),
        searchOpenFilterButton: () => cy.getByTestId('search-open-filters-button'),
        searchFilterLargeButton: () => cy.getByTestId('search-filter-Large-checkbox'),
        searchFilterResultsButton: () => cy.getByTestId('search-filter-results-button'),
        productSelected: () => cy.get(':nth-child(1) > :nth-child(1) > .max-w-xs > :nth-child(1) > .relative > .flex > .lazy-load-image-background > img'),
        agreeButton: () => cy.get('#headlessui-switch-9'),
        btnBuyNow: () => cy.get('.my-6 > .w-full'),
        acceptAllCookies: () => cy.get('#rcc-confirm-button')
    }

    elementShoppingCart = {
        btnSubtractItem: () => cy.get(':nth-child(3) > .flex-shrink-0'),
        btnIncreaseItem: () => cy.get('.flex-col > :nth-child(1) > .flex-shrink-0'),
        labelNumberOfProductsInTheCart: () => cy.get('.col-span-1 > .justify-between > .flex-col > :nth-child(2) > .text-sm'),
        returnToCart: () => cy.get('.mb-2 > .inline-flex'),
        usernameInput: () => cy.get('[data-testid="sign-in-username-input"]'),
        passwordInput: () => cy.get('[data-testid="sign-in-password-input"]'),
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

        if (this.elementAddProduct.agreeButton().should('be.visible')) {
            this.elementAddProduct.agreeButton().click()
        }

        this.elementAddProduct.btnBuyNow().click()
    }

    submitPaymentWithCard() {
        cy.wait(3000)
        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
            this.elementsPayment.cardAddress().click()
            cy.wait(3000)
            this.elementsPayment.btnGoToPayment().click()
        } else {
            cy.wait(3000);
            this.elementsPayment.cardAddress().click()
            this.elementsPayment.btnGoToPayment().click()
        }

        cy.wait(6000);

        if (!this.elementsPayment.cardFinal9398().should('be.visible')) {
            this.elementsPayment.btnAddCard().contains('adicionar').click();

            cy.wait(3000);

            this.elementsPayment.inputCardName().focus().type('Helder F Paula');
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

        this.elementsPayment.cardFinal9398().click()
        this.elementsPayment.btnPaymentSubmit().click()

    }

    submitPaymentInInstallments() {
        cy.wait(6000);

        this.elementsPayment.cardAddress().click()
        this.elementsPayment.btnGoToPayment().click()

        cy.wait(6000);

        this.elementsPayment.cardFinal9398().click()

        // Selecionando a quantidade de parcelas
        cy.get('[data-testid="payment-installment-select"]').select(1)

        this.elementsPayment.btnPaymentSubmit().click()
    }

    submitPaymentWithInvoice() {
        cy.wait(3000)
        if (this.elementsPayment.btnNext().should('be.visible')) {
            cy.wait(3000)
            this.elementsPayment.btnNext().click()
            this.elementsPayment.cardAddress().click()
            cy.wait(3000)
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
            cy.wait(3000)
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

        this.elementsPayment.inputCardName().focus().type('Helder F Paula');
        this.elementsPayment.inputCardNumber().focus().type('5461672960719505');
        this.elementsPayment.inputCardExpireDate().focus().type('0422');
        this.elementsPayment.inputCardSecurityCode().focus().type('528');
        cy.get('#billingAddress').select("Helder Fernandes (Rua das Nogueiras)")
        this.elementsPayment.btnAddCardFormulary().focus().click();
    }

    addNewCard() {

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

        this.elementsPayment.inputCardName().focus().type('Helder F Paula');
        this.elementsPayment.inputCardNumber().focus().type(fakerCardNumber);
        this.elementsPayment.inputCardExpireDate().focus().type('0530');
        this.elementsPayment.inputCardSecurityCode().focus().type(fakerCardCVV);
        cy.get('#billingAddress').select("Helder Fernandes (Rua das Nogueiras)")
        this.elementsPayment.btnAddCardFormulary().focus().click();
    }
}

export const checkoutPage = new CheckoutPage();