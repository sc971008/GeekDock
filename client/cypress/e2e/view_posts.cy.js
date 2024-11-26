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


    it("2.1 | Adds multiple questions one by one and displays them in All Questions", () => {
        cy.visit("http://localhost:3000");
    
        // Add multiple questions
        cy.contains("Ask a Question").click();
        cy.get('#formUserInput').type('sc971008');
        cy.get('#formPassInput').type('wssc19971008');
        cy.get('.form_postBtn').click();
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 1");
        cy.get("#formTextInput").type("Test Question 1 Text");
        cy.get("#formTagInput").type("javascript{enter}");
        cy.contains("Post Question").click();
    
        
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 2");
        cy.get("#formTextInput").type("Test Question 2 Text");
        cy.get("#formTagInput").type("react{enter}");
        cy.contains("Post Question").click();
    
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question 3");
        cy.get("#formTextInput").type("Test Question 3 Text");
        cy.get("#formTagInput").type("java{enter}");
        cy.contains("Post Question").click();
    
        // verify the presence of multiple questions in most recently added order.
        cy.contains("Stack Over Flow");
        const qTitles = [
          "Test Question 3",
          "Test Question 2",
          "Test Question 1",
          "Quick question about storage on android",
          "Object storage for a web application",
          "android studio save string shared preference, start activity and load the saved string",
          "Programmatically navigate using React router",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
    
        // verify that when clicking "Unanswered", the unanswered questions are shown
        cy.contains("Unanswered").click();
        const qTitlesUnanswered = [
          "Test Question 3",
          "Test Question 2",
          "Test Question 1",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitlesUnanswered[index]);
        });
      });
    
      it("2.2 | Ask a Question creates and displays expected meta data", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Ask a Question").click();
        cy.get('#formUserInput').type('sc971008');
        cy.get('#formPassInput').type('wssc19971008');
        cy.get('.form_postBtn').click();
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question Q1");
        cy.get("#formTextInput").type("Test Question Q1 Text T1");
        cy.get("#formTagInput").type("javascript{enter}");
    
        cy.contains("Post Question").click();
        cy.contains("Stack Over Flow");
        cy.contains("5 questions");
        cy.contains("sc971008 asked 0 seconds ago");
        const answers = [
          "0 answers",
          "1 answers",
          "2 answers",
          "3 answers",
          "2 answers",
        ];
        const views = [
          "0 views",
          "103 views",
          "200 views",
          "121 views",
          "10 views",
        ];
        cy.get(".postStats").each(($el, index, $list) => {
          cy.wrap($el).should("contain", answers[index]);
          cy.wrap($el).should("contain", views[index]);
        });
        cy.contains("Unanswered").click();
        cy.get(".postTitle").should("have.length", 1);
        cy.contains("1 question");
      });
    
      it("2.3 | Ask a Question with empty title shows error", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Ask a Question").click();
        cy.get('#formUserInput').type('sc971008');
        cy.get('#formPassInput').type('wssc19971008');
        cy.get('.form_postBtn').click();
        cy.contains("Ask a Question").click();
        cy.get("#formTextInput").type("Test Question 1 Text Q1");
        cy.get("#formTagInput").type("javascript{enter}");
        cy.contains("Post Question").click();
        cy.contains("Title cannot be empty");
      });


      it("6.1 | Adds a question, click active button, verifies the sequence", () => {
        cy.visit("http://localhost:3000");
    
        // add a question
        cy.contains("Ask a Question").click();
        cy.get('#formUserInput').type('sc971008');
        cy.get('#formPassInput').type('wssc19971008');
        cy.get('.form_postBtn').click();
        cy.contains("Ask a Question").click();
        cy.get("#formTitleInput").type("Test Question A");
        cy.get("#formTextInput").type("Test Question A Text");
        cy.get("#formTagInput").type("javascript{enter}");
        cy.contains("Post Question").click();
    
        // add an answer to question of React Router
        cy.contains("Programmatically navigate using React router").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer to React Router");
        cy.contains("Post Answer").click();
    
        // go back to main page
        cy.contains("Questions").click();
    
        // add an answer to question of Android Studio
        cy.contains(
          "android studio save string shared preference, start activity and load the saved string"
        ).click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer to android studio");
        cy.contains("Post Answer").click();
    
        // go back to main page
        cy.contains("Questions").click();
    
        // add an answer to question A
        cy.contains("Test Question A").click();
        cy.contains("Answer Question").click();
        cy.get("#answerTextInput").type("Answer Question A");
        cy.contains("Post Answer").click();
    
        // go back to main page
        cy.contains("Questions").click();
    
        // clicks active
        cy.contains("Active").click();
    
        const qTitles = [
          "Test Question A",
          "android studio save string shared preference, start activity and load the saved string",
          "Programmatically navigate using React router",
          "Quick question about storage on android",
          "Object storage for a web application",
        ];
        cy.get(".postTitle").each(($el, index, $list) => {
          cy.wrap($el).should("contain", qTitles[index]);
        });
      });
    
      it("6.2 | Checks if a6 and a7 exist in q3 answers page", () => {
        const answers = [
          "Using GridFS to chunk and store content.",
          "Storing content as BLOBs in databases.",
        ];
        cy.visit("http://localhost:3000");
        cy.contains("Object storage for a web application").click();
        cy.get(".answerText").each(($el, index) => {
          cy.contains(answers[index]);
        });
      });
    
      it("6.3 | Checks if a8 exist in q4 answers page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        cy.contains("Store data in a SQLLite database.");
      });
    
     
    

});