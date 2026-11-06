
describe("QAuto Header and Footer Tests", () => {
  beforeEach(() => {
    cy.visit("https://guest:welcome2qauto@qauto.forstudy.space/");
  });

  // HEADER TESTS

  it("Should find Home in header", () => {
    cy.get("header")
      .contains("Home")
      .should("be.visible");
  });

  it("Should find About in header", () => {
    cy.get("header")
      .contains("About")
      .should("be.visible");
  });

  it("Should find Contacts in header", () => {
    cy.get("header")
      .contains("Contacts")
      .should("be.visible");
  });

  it("Should find Guest log in in header", () => {
    cy.get("header")
      .contains("Guest log in")
      .should("be.visible");
  });

  it("Should find Sign In button", () => {
    cy.get("header")
      .contains("Sign In")
      .should("be.visible");
  });

  // FOOTER TESTS

 it("Should find all social media links", () => {
  cy.get(".contacts_socials a[href*='facebook.com']")
    .should("exist");

  cy.get(".contacts_socials a[href*='t.me']")
    .should("exist");

  cy.get(".contacts_socials a[href*='youtube.com']")
    .should("exist");

  cy.get(".contacts_socials a[href*='instagram.com']")
    .should("exist");

  cy.get(".contacts_socials a[href*='linkedin.com']")
    .should("exist");

  cy.get(".contacts_socials a[href*='linkedin.com']")
    .should("exist");
});
  it("Should find Hillel website link", () => {
    cy.get("a[href='https://ithillel.ua']")
      .should("be.visible");
  });

  it("Should find support email link", () => {
    cy.get("a[href='mailto:developer@ithillel.ua']")
      .should("be.visible")
      .and("contain.text", "support@ithillel.ua");
  });
});
