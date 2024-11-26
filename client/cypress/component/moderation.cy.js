import React from "react";
import NewQuestion from "../../src/components/main/newQuestion"; // Adjust the import path



  it("should render without errors", async() => {
    cy.mount(<NewQuestion/>)
  cy.get('#formTitleInput').type('asshole')
  cy.get('#formTextInput').type('sorry for saying bad words, just for texting')
  cy.get('#formTagInput').type('a b c d e f')
  cy.get('.form_postBtn').click()

  cy.get("#formTitleInput").should("have.value", "xxxxxxx"); // If using a bad word filter
  cy.get("#formTextInput").should("have.value", "sorry for saying bad words, just for texting");
  


  });
  
