class SinginPage {
  elements = {
    emailInput: () => cy.xpath('//*[@id="email"]'),
    passwordInput: () => cy.xpath('//*[@id="password"]'),
    loginBtn: () => cy.get('.hidden > .styles_polygon__Xp_5L > .flex'),
    logoutButton: () => cy.xpath('//*[@id="__next"]/div[2]/div[4]/div/div[2]/div/form/section/div[5]/button[2]'),
    errorMessage: () => cy.get('h3[data-test="error"]'),
    requiredUsernameError: () => cy.get('[data-testid="sign-in-username-error"]'),
    requiredPasswordError: () => cy.get('[data-testid="sign-in-password-error"]'),
    profileTab: () => cy.xpath("//a[@class='whitespace-nowrap text-base font-semibold uppercase xxl1:text-lg xxl1:font-bold' and contains(text(), 'Perfil')]"),
  };
  
  typeUsername(username) {
    this.elements.emailInput().type(username);
  }
  
  typePassword(password) {
    this.elements.passwordInput().type(password);
  }
  
  clickLogin() {
    this.elements.loginBtn().click();
  }
  
  submitLogin(username,password){
    this.elements.emailInput().type(username);
    this.elements.passwordInput().type(password);
    this.elements.loginBtn().click();
  }
}
  
export const signinPage = new SinginPage();