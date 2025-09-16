import { checkoutPage } from "@pages/CheckoutPage";

class SinginPage {
  elements = {
    usernameInput: () => cy.getByTestId("input-username"),
    passwordInput: () => cy.xpath("//input[@data-testid='input-password']"),
    loginBtn: () => cy.getByTestId("button-signin-submit"),
    logoutButton: () => cy.getByTestId('"logout-button"'),
    errorMessage: () => cy.get('h3[data-test="error"]'),
    requiredUsernameError: () => cy.get('[data-testid="sign-in-username-error"]'),
    requiredPasswordError: () => cy.getByTestId('error-input-password')
  };
  
  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }
  
  typePassword(password) {
    this.elements.passwordInput().type(password);
  }
  
  clickLogin() {
    this.elements.loginBtn().click();
  }

  aceitaCookie() {
    if (checkoutPage.elementAddProduct.acceptAllCookies().should('be.visible')) {
        checkoutPage.elementAddProduct.acceptAllCookies().click()
    }
  }
  
  submitLogin(username,password){
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }
}
  
export const signinPage = new SinginPage();