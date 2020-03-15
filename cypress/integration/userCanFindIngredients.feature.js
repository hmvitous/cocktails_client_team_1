describe("User can find", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
    cy.route({
      method: "POST",
      url: "**/cocktails",
      response: "fixture:margarita_drink_search.json"
    });
    cy.get("#name-search.prompt").type("Margarita");
    cy.get("button")
      .contains("Search")
      .click();
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:margarita_details.json"
    });
    cy.get("#details-button").click();
  });

  it("ingredient options from System Bolaget", () => {
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:tequila_list.json"
    });
    cy.get("#booze-button").click();
    cy.get("#booze-options").should("contain", "Cenote");
    cy.get("#booze-options").should("contain", "Tequila Blanco");
    cy.get("#booze-options").should("contain", "Sprit");
    cy.get("#booze-options").should("contain", "Fabrica De Tequilas Finos");
    cy.get("#booze-options").should("contain", "699");
    cy.get("#booze-options").should("contain", "Mexiko");
    cy.get("#booze-options").should("contain", "Cenote Tequila");
    cy.get("#booze-options").should("contain", "Reserva del Señor");
  });
});
