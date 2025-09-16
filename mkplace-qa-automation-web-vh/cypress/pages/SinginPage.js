class SinginPage {
  elements = {
    usernameInput: () => cy.get('[data-testid="sign-in-username-input"]'),
    passwordInput: () => cy.get('[data-testid="sign-in-password-input"]'),
    loginBtn: () => cy.get('[data-testid="sign-in-submit-button"]'),
    logoutButton: () => cy.get('[data-testid="sign-out-submit-button"]'),
    errorMessage: () => cy.get('h3[data-test="error"]'),
    requiredUsernameError: () => cy.get('[data-testid="sign-in-username-error"]'),
    requiredPasswordError: () => cy.get('[data-testid="sign-in-password-error"]')
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
  
  submitLogin(username,password){
    this.elements.usernameInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }
}
  
export const signinPage = new SinginPage();