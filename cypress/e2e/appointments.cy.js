describe('template spec', () => {

  //We can use setup and teardown methods for this instead of including the same code in each test.
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset"); //See Note at the end of this test.
    // visit the root of the web server
    cy.visit('/');
    // confirm that the DOM contains the text "Monday"
    cy.contains("Monday");
  });


  /* First Test */
  it("should book an interview", () => {
    //find the Add button for the appointment slot that we want to book
    cy.get("[alt=Add]")
      .first() //We need to use first because there are two Add buttons
      .click()

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']") //'' on 'Sylvia Palmer' because of white space
      .click()

    //Clicks the save button
    cy.contains("Save")
      .click()

    //We need to wait until the Show component is displaying the student and interview names.
    cy.contains(".appointment__card--show","Lydia Miller-Jones")
    cy.contains(".appointment__card--show","Sylvia Palmer")
    //Note: If you refresh this entire code, you will get an error on Cypress, because state has been change. We added new appointment. Hence, need to reset before rerun. We should use the cy.request(method, url) command to "GET" to "/api/debug/reset" at the beginning of the test function.
  });


  /* Second test */
  it("should edit an interview", () => {
    cy.contains("Archie Cohen");
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });//Forces the click action, even if the button is covered, not visible, or not in an interactable state.

    cy.get("[data-testid=student-name-input]")
      .clear() //Clearing the input field
      .type("Lydia Miller-Jones");
    
    cy.get("[alt='Tori Malcolm']")
      .click();
    
    cy.contains("Save")
      .click();

    cy.contains("Saving...")
      .should("exist");

    //We need to wait until the Show component is displaying the student and interview names.
    cy.contains(".appointment__card--show","Lydia Miller-Jones")
    cy.contains(".appointment__card--show","Tori Malcolm")
  });

  it("should cancel an interview", () => {
    cy.contains("Archie Cohen");
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });//Forces the click action, even if the button is covered, not visible, or not in an interactable state.

    cy.contains("Are you sure you would like to delete?")

    cy.contains("Confirm")
      .click()
    
    cy.contains("Deleting...")
      .should("exist");
    
      cy.contains("Deleting...")
      .should("not.exist");

    //We need to wait until the Empty component shows
    cy.contains(".appointment__card--show","Archie Cohen")
        .should("not.exist")
  });


})