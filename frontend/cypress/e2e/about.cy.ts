describe("load about section", () => {
  it("check map is showing when clicked on about", () => {
    cy.visit("localhost:8082");
    cy.contains("About").should("exist");
    cy.contains("About").click();
    cy.get("h2").should(
      "contain.text",
      "This is a weather forecast application"
    );
    cy.get(".vue-map").should("not.exist");
  });
});
