
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


Cypress.Commands.add("createExpense", (expenseData) => {
  return cy.request({
    method: "POST",
    url: "/api/expenses",
    body: expenseData,
  });
});
