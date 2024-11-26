
describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });


  it('4.1 | should subscribe to the question', () => {
    cy.visit("http://localhost:3000");
    cy.contains('New User').click();
    cy.get('#formUserInput').type('Nene');
    cy.get('#formPassInput').type('wssc19971006@');
    cy.get('.form_postBtn').click();
    cy.visit("http://localhost:3000");
    cy.contains('Log In').click();
    cy.get('#formUserInput').type('Nene');
    cy.get('#formPassInput').type('wssc19971006@');
    cy.get('.form_postBtn').click();
    cy.contains("Quick question about storage on android").click();
    cy.contains('🔔').click().click().should('contain', '✅️ Already subscribed'); 
    
    
    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains('🔔').click().click().should('contain', '✅️ Already subscribed');

    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains('🔔').click().click().should('contain', '✅️ Already subscribed');
  });
  

  it('5.1 | should not subscribe to the question without login', () => {
    cy.visit("http://localhost:3000");
    cy.contains("Quick question about storage on android").click();
    cy.contains('🔔').click().click().should('contain', '⛔️ Not logged In ...Redirecting'); 
  }); 

  it('5.2 | should not subscribe to the question without login', () => {
    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains('🔔').click().click().should('contain', '⛔️ Not logged In ...Redirecting');
  });

  });


