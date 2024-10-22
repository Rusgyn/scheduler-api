describe('Navigation', () => {
  it('should visit the root', () => {
    cy.visit('/'); //check cypress.config.js file > baseUrl > entire url address
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.get("li").contains("Tuesday").click();
  });



})