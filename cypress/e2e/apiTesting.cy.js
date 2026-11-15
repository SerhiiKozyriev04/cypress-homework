
/// <reference types="cypress" />
import ExpensesPage from "../pages/ExpensesPage";

import GaragePage from "../pages/GaragePage";

describe("API Testing", () => {
  let carId;
  const reportedAt = new Date().toISOString().split("T")[0];
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

  after(() => {
  if (carId) {
    cy.request("DELETE", `/api/cars/${carId}`)
      .its("status")
      .should("eq", 200);
    }
   });



it("Should intercept car creation response", () => {
  cy.intercept("POST", "**/api/cars").as("createCar");

  GaragePage.addCar("Audi", "TT", "1000");

  cy.wait("@createCar").then((interception) => {
    expect(
      interception.response.statusCode,
      JSON.stringify(interception.response.body)
    ).to.equal(201);

    carId = interception.response.body.data.id;

    expect(carId).to.be.a("number");

    cy.log(`Created car ID: ${carId}`);
  });
});



it("Should get created car through API", () => {
  cy.request("GET", "/api/cars").then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("ok");
    expect(response.body.data).to.be.an("array");

    const createdCar = response.body.data.find(
      (car) => car.id === carId
    );

    expect(createdCar).to.exist;

    expect(createdCar).to.include({
      id: carId,
      brand: "Audi",
      model: "TT",
      initialMileage: 1000,
      mileage: 1000,
    });
  });
});



it("Should create fuel expense through API", () => {
  const expenseData = {
    carId: carId,
    reportedAt: reportedAt,
    mileage: 1500,
    liters: 40,
    totalCost: 60,
    forceMileage: false,
  };

  cy.createExpense(expenseData).then((response) => {
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("ok");

    expect(response.body.data.id).to.be.a("number");

    expect(response.body.data).to.include({
      carId: expenseData.carId,
      reportedAt: expenseData.reportedAt,
      mileage: expenseData.mileage,
      liters: expenseData.liters,
      totalCost: expenseData.totalCost,
    });
  });
});



it("Should verify API created expense through UI", () => {
  cy.intercept("GET", "**/api/expenses?*").as("getExpenses");

  ExpensesPage.open();

  cy.wait("@getExpenses").then((interception) => {
    expect(interception.response.statusCode).to.equal(200);

    expect(interception.request.query.carId)
      .to.equal(String(carId));
  });

  ExpensesPage.verifyExpense("1500", "40", "60");
  const formattedDate = reportedAt.split("-").reverse().join(".");

  cy.contains("tr", "1500").within(() => {
  cy.contains("td", formattedDate).should("be.visible");
});

});

});



