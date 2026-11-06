
/// <reference types="cypress" />

Cypress.Commands.overwrite("type", (originalFn, element, text, options = {}) => {
  if (options.sensitive) {
    options.log = false;

    Cypress.log({
      $el: element,
      name: "type",
      message: "*".repeat(String(text).length),
    });
  }

  return originalFn(element, text, options);
});


Cypress.Commands.add("login", (email, password) => {
  cy.contains("button", "Sign In").click();

  cy.get("#signinEmail").type(email);
  cy.get("#signinPassword").type(password, { sensitive: true });

  cy.contains("button", "Login").click();
  cy.url().should("include", "/garage");
});

describe("QAuto Registration", () => {
  const password = "TestPassword123";
  const email = `qa_${Date.now()}@example.com`;

  beforeEach(() => {
    cy.visit("https://qauto.forstudy.space/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.get(".hero-descriptor_btn").click();
  });

  it("Should display registration form", () => {
    cy.get("#signupName").should("be.visible");
    cy.get("#signupLastName").should("be.visible");
    cy.get("#signupEmail").should("be.visible");
    cy.get("#signupPassword").should("be.visible");
    cy.get("#signupRepeatPassword").should("be.visible");
  });

  it("Should show error for empty Name", () => {
    cy.get("#signupName").click().blur();
    cy.contains("Name required").should("be.visible");
  });

  it("Should show error for empty Last Name", () => {
    cy.get("#signupLastName").click().blur();
    cy.contains("Last name required").should("be.visible");
  });

  it("Should show error for empty Email", () => {
    cy.get("#signupEmail").click().blur();
    cy.contains("Email required").should("be.visible");
  });

  it("Should show error for empty Password", () => {
    cy.get("#signupPassword").click().blur();
    cy.contains("Password required").should("be.visible");
  });

  it("Should show error for empty Re-enter Password", () => {
    cy.get("#signupRepeatPassword").click().blur();
    cy.contains("Re-enter password required").should("be.visible");
  });

  it("Should show error for short Name", () => {
    cy.get("#signupName").type("A").blur();

    cy.contains("Name has to be from 2 to 20 characters long")
      .should("be.visible");
  });

  it("Should show error for short Last Name", () => {
    cy.get("#signupLastName").type("A").blur();

    cy.contains("Last name has to be from 2 to 20 characters long")
      .should("be.visible");
  });

  it("Should show error for long Name", () => {
    cy.get("#signupName")
      .type("ABCDEFGHIJKLMNOPQRSTU")
      .blur();

    cy.contains("Name has to be from 2 to 20 characters long")
      .should("be.visible");
  });

  it("Should show error for long Last Name", () => {
    cy.get("#signupLastName")
      .type("ABCDEFGHIJKLMNOPQRSTU")
      .blur();

    cy.contains("Last name has to be from 2 to 20 characters long")
      .should("be.visible");
  });

  it("Should show error for invalid Name", () => {
    cy.get("#signupName").type("12345").blur();

    cy.contains("Name is invalid")
      .should("be.visible");
  });

  it("Should show error for invalid Last Name", () => {
    cy.get("#signupLastName").type("12345").blur();

    cy.contains("Last name is invalid")
      .should("be.visible");
  });

  it("Should show error for invalid Email", () => {
    cy.get("#signupEmail").type("wrongemail").blur();

    cy.contains("Email is incorrect")
      .should("be.visible");
  });

  it("Should show error for short Password", () => {
    cy.get("#signupPassword")
      .type("Test1", { sensitive: true })
      .blur();

    cy.contains("Password has to be from 8 to 15 characters long")
      .should("be.visible");
  });

  it("Should show error for long Password", () => {
    cy.get("#signupPassword")
      .type("TestPassword123456789", { sensitive: true })
      .blur();

    cy.contains("Password has to be from 8 to 15 characters long")
      .should("be.visible");
  });

  it("Should show error for invalid Password", () => {
    cy.get("#signupPassword")
      .type("password123", { sensitive: true })
      .blur();

    cy.contains("Password has to be from 8 to 15 characters long")
      .should("be.visible");
  });

  it("Should show error for different passwords", () => {
    cy.get("#signupPassword")
      .type(password, { sensitive: true });

    cy.get("#signupRepeatPassword")
      .type("Different123", { sensitive: true })
      .blur();

    cy.contains("Passwords do not match")
      .should("be.visible");
  });

  it("Should disable Register button for empty form", () => {
    cy.contains("button", "Register")
      .should("be.disabled");
  });

  it("Should register user and login using custom command", () => {
    cy.get("#signupName").type("Anna");
    cy.get("#signupLastName").type("Smith");
    cy.get("#signupEmail").type(email);

    cy.get("#signupPassword")
      .type(password, { sensitive: true });

    cy.get("#signupRepeatPassword")
      .type(password, { sensitive: true });

    cy.contains("button", "Register")
      .should("be.enabled")
      .click();

    
    cy.url().should("include", "/garage");

   
    cy.contains("Log out").click();

    
    cy.login(email, password);
  });
});
