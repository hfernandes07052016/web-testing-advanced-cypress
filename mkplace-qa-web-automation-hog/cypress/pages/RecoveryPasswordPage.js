class RecoveryPasswordPage {
  elements = {
    recoveryPasswordButton: () => cy.getByTestId("recover-password-button-access"),
    recoveryPasswordInput: () => cy.getByTestId("recover-password-username-input"),
    recoveryPasswordSubmit: () => cy.getByTestId("recover-password-submit-button"),
    errorMessage: () => cy.getByTestId('recover-password-username-error'),
  };
  
submitRecoveryPassword(email){
    this.elements.recoveryPasswordButton().click()
    this.elements.recoveryPasswordInput().type(email)
  }
}
  
export const recoveryPasswordPage = new RecoveryPasswordPage();
  