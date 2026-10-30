describe("My first Cypress test", () => {
  it("Should open Cypress website", () => {
    cy.visit("/");

    cy.url().should("include", "example.cypress.io");
  });
});