describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });

    it('should filter profanities from the question title and text', () => {
        cy.visit("http://localhost:3000");
        cy.contains("Ask a Question").click();
        cy.get('#formUserInput').type('sc971008');
        cy.get('#formPassInput').type('wssc19971008');
        cy.get('.form_postBtn').click();

        cy.contains("Ask a Question").click();
        

        // Input values containing profanities
        const profaneTitle = 'This is a asshole title';
        const profaneText = 'This question contains badword text';

        // Interact with input fields
        cy.get('#formTitleInput').type(profaneTitle);
        cy.get('#formTextInput').type(profaneText);

        // Interact with tags
        cy.get('#formTagInput').type('NewTag{enter}');

        // Click the post question button
        cy.get('.form_postBtn').click();

        // After clicking, check the filtered output
        cy.wait(500); // Wait for the state update

    
    
    });

});
