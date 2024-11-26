describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });
    it("11.1 | Check log-in", () => {
        cy.visit("http://localhost:3000");
      
        // add a question with tags
        cy.contains("Log In").click();
      //   cy.get("#formUserInput").type("sc971008");
      //   cy.get("#formPassInput").type("wssc19971008");
      //   cy.contains("Log In").click();
    });
       it('11.2 | should display error messages for empty fields', () => {
        cy.visit("http://localhost:3000");
      
        // add a question with tags
        cy.contains("Log In").click();
            // Try to submit the form without filling out fields
            cy.get('.form_postBtn').click();
            cy.get('#formUserInput').then(($input) => {
                // expect($input[0].validationMessage).to.contain('Username cannot be empty');
                cy.contains('Username cannot be empty').should('be.visible');
            });
            cy.get('#formPassInput').then(($input) => {
                cy.contains('Password cannot be empty').should('be.visible');
                // expect($input[0].validationMessage).to.contain('Password cannot be empty');
            });
        });
      
        it('11.3 | should display an error message if login is unsuccessful', () => {
            // Set up stub for authUser service to simulate unsuccessful login
            cy.visit("http://localhost:3000");
      
            // add a question with tags
            cy.contains("Log In").click();
      
            // Fill the username and password fields
            cy.get('#formUserInput').type('incorrectUser');
            cy.get('#formPassInput').type('incorrectPass');
            cy.get('.form_postBtn').click();
      
            // Check for the error feedback message
            cy.contains('Username not found').should('be.visible');
        
        });
      
        it('11.4 | should log in successfully and redirect to home page', () => {
            // Set up stub for authUser service to simulate a successful login
            cy.visit("http://localhost:3000");
      
            // add a question with tags
            cy.contains("Log In").click();
          //   cy.get("#formUserInput").type("sc971008");
          //   cy.get("#formPassInput").type("wssc19971008");
          //   cy.contains("Log In").click();
      
            // Fill the username and password fields
            cy.get('#formUserInput').type('sc971008');
            cy.get('#formPassInput').type('wssc19971008');
            cy.get('.form_postBtn').click();
      
            // Check for the success feedback message
            // cy.get('.goodfeedback').should('contain', 'Log In successfully ....Redirecting To HomePage');
            cy.contains('sc971008 Log In sucessfully ....Redirecting To HomePage').should('be.visible');

        });


        it("12.1 | Check new-user", () => {
            cy.visit("http://localhost:3000");
          
            // add a question with tags
            cy.contains("New User").click();
          
            it("Should display error for empty username", () => {
              cy.get("#formPassInput").type("StrongPassword!@#");
              cy.contains("Confirm to Register").click();
              cy.contains("Username cannot be empty"); // Check if the error message is displayed
            });})
          
          
            it("12.2 |Should display error for short password", () => {
                cy.visit("http://localhost:3000");
                cy.contains("New User").click();
              cy.get("#formUserInput").type("validUsername");
              cy.get("#formPassInput").type("short");
              cy.contains("Confirm to Register").click();
              cy.contains("At least to be 10 char long").should('be.visible'); // Ensure the appropriate error message is shown
            });
          
            it("12.3 |Should display error for invalid characters in username", () => {
                cy.visit("http://localhost:3000");
                cy.contains("New User").click();
              cy.get("#formUserInput").type("invalid@username");
              cy.get("#formPassInput").type("StrongPassword!@#");
              cy.contains("Confirm to Register").click();
              cy.contains("Username can only contains alphabet char").should('be.visible'); // Verify the error message
            });
          
            it("12.4 |Should display error for lack of special characters in password", () => {
                cy.visit("http://localhost:3000");
                cy.contains("New User").click();
              cy.get("#formUserInput").type("nene1");
              cy.get("#formPassInput").type("passwordonly");
              cy.contains("Confirm to Register").click();
              cy.contains("Use at least 1 special char").should('be.visible'); // Ensure this specific error is displayed
            });
      
      });