describe("load map and card", () => {
  it("check if the map is not there when its loaded without entering value", () => {
    cy.visit("localhost:8082");
    cy.get(".vue-map").should("not.exist");
    cy.get("h3").should("contain.text", "Type a city name to search");
  });

  it("check if the map is  loaded when select one value", () => {
    cy.visit("localhost:8082");

    cy.get("input").type("DEN");

    cy.get(".pac-item").first().click();
    cy.get(".vue-map").should("be.visible");
    cy.get("h3.font-bold.text-lg.w-full").should(
      "contain.text",
      "Weather forecast for city"
    );
  });
});
