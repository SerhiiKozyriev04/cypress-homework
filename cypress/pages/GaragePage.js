
class GaragePage {
  get addCarButton() {
    return cy.contains("button", "Add car");
  }

  get brandDropdown() {
    return cy.get("#addCarBrand");
  }

  get modelDropdown() {
    return cy.get("#addCarModel");
  }

  get mileageInput() {
    return cy.get("#addCarMileage");
  }

  get addButton() {
    return cy.contains("button", /^Add$/);
  }

  get carCards() {
    return cy.get(".car-item");
  }

  addCar(brand, model, mileage) {
    this.addCarButton.click();
    this.brandDropdown.select(brand);
    this.modelDropdown.select(model);
    this.mileageInput.type(mileage);
    this.addButton.click();
  }

  openAddExpense(carName, mileage) {
    this.carCards
      .filter((index, car) => {
        return Cypress.$(car).text().includes(carName) &&
          Cypress.$(car).find(".update-mileage-form_input").val() === String(mileage);
      })
      .should("have.length", 1)
      .find(".car_add-expense")
      .click();
  }
}

export default new GaragePage();
