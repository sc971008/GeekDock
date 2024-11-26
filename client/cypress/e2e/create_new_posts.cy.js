describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    it('1.1 | Adds three questions and one answer, then click "Questions", then click unanswered button, verifies the sequence', () => {
      cy.visit("http://localhost:3000");
  
      // add a question
      cy.contains("Ask a Question").click();
      cy.get('#formUserInput').type('sc971008');
      cy.get('#formPassInput').type('wssc19971008');
      cy.get('.form_postBtn').click();

      cy.contains("Ask a Question").click();
      cy.get("#formTitleInput").type("Test Question A");
      cy.get("#formTextInput").type("Test Question A Text");
      cy.get('#formTagInput').type('Tag1{enter}Tag2{enter}Tag3{enter}Tag4{enter}');
  
      // Click the Post Question button
      cy.get('.form_postBtn').click();

      // add another question
  
  
      cy.contains("Ask a Question").click();
      cy.get("#formTitleInput").type("Test Question B");
      cy.get("#formTextInput").type("Test Question B Text");
      cy.get("#formTagInput").type("javascript{enter}");
  
  
      
      cy.get('.form_postBtn').click();

  
      // add another question
      cy.contains("Ask a Question").click();
      cy.get("#formTitleInput").type("Test Question C");
      cy.get("#formTextInput").type("Test Question C Text");
      cy.get("#formTagInput").type("javascript{enter}");
      cy.get('.form_postBtn').click();
  
      // add an answer to question A  

      cy.contains("Test Question A").click();
      cy.contains("Answer Question").click();
      cy.get("#answerTextInput").type("Answer Question A");
      cy.contains("Post Answer").click();
  
      // go back to main page
      cy.contains("Questions").click();
  
      // // clicks unanswered

      cy.contains("Unanswered").click();
      const qTitles = ["Test Question C", "Test Question B"];
      cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
      });
    });
  
    it("1.2 | Check if questions are displayed in descending order of dates.", () => {
      // cy.visit("http://localhost:3000");
      const qTitles = [
        "Quick question about storage on android",
        "Object storage for a web application",
        "android studio save string shared preference, start activity and load the saved string",
        "Programmatically navigate using React router",
      ];
  
      cy.visit("http://localhost:3000");
      cy.contains("Newest").click();
      cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
      });
    });
  
    it("1.3 | successfully shows all questions in model in active order", () => {
      const qTitles = [
        "Programmatically navigate using React router",
        "android studio save string shared preference, start activity and load the saved string",
        "Quick question about storage on android",
        "Object storage for a web application",
      ];
      cy.visit("http://localhost:3000");
      cy.contains("Active").click();
      cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
      });
    });




});