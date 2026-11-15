
class ExpensesPage {
  get expensesLink() {
    return cy.contains("a", "Fuel expenses");
  }

  get mileageInput() {
    return cy.get("#addExpenseMileage");
  }

  get litersInput() {
    return cy.get("#addExpenseLiters");
  }

  get totalCostInput() {
    return cy.get("#addExpenseTotalCost");
  }

  get addButton() {
    return cy.contains("button", /^Add$/);
  }

  open() {
    this.expensesLink.click();
  }

  addExpense(mileage, liters, totalCost) {
    this.mileageInput.clear().type(mileage);
    this.litersInput.type(liters);
    this.totalCostInput.type(totalCost);
    this.addButton.click();
  }

 
verifyExpense(mileage, liters, totalCost) {
  cy.contains("tr", mileage).within(() => {
    cy.contains("td", mileage).should("be.visible");
    cy.contains("td", `${liters}L`).should("be.visible");

    cy.contains("td", "USD").should(($cell) => {
      const actualCost = $cell.text().trim();

      expect(actualCost).to.include("USD");
      expect(parseFloat(actualCost)).to.equal(Number(totalCost));
    });
  });
}

}

export default new ExpensesPage();
