
describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });

it('3.1 | should open the Save Question modal', () => {
    cy.visit("http://localhost:3000");
    cy.contains("Programmatically navigate using React router").click();
    cy.contains('💾').click();
    cy.get('#formUserInput').type('sc971008');
    cy.get('#formPassInput').type('wssc19971008');
    cy.get('.form_postBtn').click();
    cy.contains("Programmatically navigate using React router").click();
    cy.contains('💾').click();
    cy.get('.SaveModal').should('be.visible');
    cy.get('#formListNameInput').type('My New List');
    cy.get('.greenbtn').contains('Add List').click();
    cy.get('.SaveModal').should('contain', '✅️ My New List added');
    cy.get('.form-select').select('My New List'); // Select the new list
    cy.get('.saveB').contains('Save').click(); // Save to the new list
    cy.get('.SaveModal').should('contain', '✅️ Added'); 
    cy.get('.SaveModal').contains('Cancel').click();


    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains('💾').click();
    cy.get('.SaveModal').should('be.visible');
    cy.get('#formListNameInput').type('My New List1');
    cy.get('.greenbtn').contains('Add List').click();
    cy.get('.SaveModal').should('contain', '✅️ My New List1 added');
    cy.get('.form-select').select('My New List1'); // Select the new list
    cy.get('.saveB').contains('Save').click(); // Save to the new list
    cy.get('.SaveModal').should('contain', '✅️ Added'); 
    cy.get('.SaveModal').contains('Cancel').click();


    cy.visit("http://localhost:3000");
    cy.contains("Quick question about storage on android").click();
    cy.contains('💾').click();
    cy.get('.SaveModal').should('be.visible');
    cy.get('#formListNameInput').type('My New List2');
    cy.get('.greenbtn').contains('Add List').click();
    cy.get('.SaveModal').should('contain', '✅️ My New List2 added');
    cy.get('.form-select').select('My New List2'); // Select the new list
    cy.get('.saveB').contains('Save').click(); // Save to the new list
    cy.get('.SaveModal').should('contain', '✅️ Added'); 
    cy.get('.SaveModal').contains('Cancel').click();
    
  });

 

  it('5.3| should not save to the question without login', () => {
    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains('💾').click().click().should('contain', '⛔️ Not logged In ...Redirecting');
  });
  it('5.4| should not save to the question without login', () => {
    cy.visit("http://localhost:3000");
    cy.contains("Quick question about storage on android").click();
    cy.contains('💾').click().click().should('contain', '⛔️ Not logged In ...Redirecting');
  });



});
