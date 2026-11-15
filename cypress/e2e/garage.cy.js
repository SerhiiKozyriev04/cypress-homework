
/// <reference types="cypress" />

import GaragePage from "../pages/GaragePage";
import ExpensesPage from "../pages/ExpensesPage";

describe("Garage and Fuel Expenses", () => {
  beforeEach(() => {
    cy.visit("/", {
      auth: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    cy.env(["email", "password"]).then(({ email, password }) => {
      cy.login(email, password);
    });
  });

  it("Should add a car and fuel expenses", () => {
    GaragePage.addCar("Audi", "TT", "1000");

    GaragePage.openAddExpense("Audi TT", "1000");

    ExpensesPage.addExpense("1500", "40", "60");

    ExpensesPage.verifyExpense("1500", "40", "60");
  });
});
