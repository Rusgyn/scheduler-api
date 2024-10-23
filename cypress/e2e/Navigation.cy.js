describe('Navigation', () => {
  it('should visit the root', () => {
    cy.visit('/'); //check cypress.config.js file > baseUrl > entire url address
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday") //Note: Add data-* attributes to make it easier to target elements in your component. data-testid="day" is in DayListItem component.
      .click()
      .should('have.class','day-list__item--selected');
    //or can be
    // cy.get("li")
    // .contains("Tuesday")
    // .click()
    // .should('have.class', 'text--regular', "background-color", "rgb(242, 242, 242)"); //the 'text--regular' is the class where it contains "Tuesday"
  });



})