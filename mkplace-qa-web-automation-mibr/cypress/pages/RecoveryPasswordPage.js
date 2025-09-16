import { checkoutPage } from "./CheckoutPage";
class RecoveryPasswordPage {
  elements = {
    recoveryPasswordButton: () => cy.getByTestId("button-recover-password"),
    recoveryPasswordInput: () => cy.getByTestId("input-username"),
    recoveryPasswordSubmit: () => cy.getByTestId("button-recover-submit"),
    errorMessage: () => cy.getByTestId('error-input-username'),
  };

  submitRecoveryPassword(email) {
    if (checkoutPage.elementAddProduct.acceptAllCookies().should('be.visible')) {
        checkoutPage.elementAddProduct.acceptAllCookies().click()
  }
    this.elements.recoveryPasswordButton().click()
    this.elements.recoveryPasswordInput().type(email)
  }
}

export const recoveryPasswordPage = new RecoveryPasswordPage();
