describe("Cypress Tests repeated from React assignment", () => {
    beforeEach(() => {
      // Seed the database before each test
      cy.exec("node ../server/init.js mongodb://127.0.0.1:27017/fake_so");
    });
  
    afterEach(() => {
      // Clear the database after each test
      cy.exec("node ../server/destroy.js mongodb://127.0.0.1:27017/fake_so");
    });
    it('1.1| should display the question and its details', () => {
        // Check the question title and other elements
        cy.visit("http://localhost:3000");
        cy.contains("Programmatically navigate using React router").click();
        cy.get('.bold_title').should('contain', 'Programmatically navigate using React router');
        cy.get('.answer_question_text').should('contain', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.');
        cy.get('.view').should('contain','views');
        cy.get('.questionBody').should('contain','asked');

        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        cy.get('.bold_title').should('contain', 'Quick question about storage on android');
        cy.get('.answer_question_text').should('contain','I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains');
        cy.get('.view').should('contain','views');
        cy.get('.questionBody').should('contain','asked');
   
        cy.visit("http://localhost:3000");
        cy.contains("Object storage for a web application").click();
        cy.get('.bold_title').should('contain', 'Object storage for a web application');
        cy.get('.answer_question_text').should('contain','I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.');
        cy.get('.view').should('contain','views');
        cy.get('.questionBody').should('contain','asked');
    });


    it('1.2 | should display the correct number of answers', () => {
        // Wait for the question data to load
        cy.visit("http://localhost:3000");
        cy.contains("Object storage for a web application").click();
        // Check if the number of answers displayed matches the expected count
        cy.get('.answer').should('have.length', 2); // Assuming there are 3 answers in the fixture
        cy.get('.answer').eq(0).should('contain', 'Storing content as BLOBs in databases.'); // Verify first answer's content
        cy.get('.answer').eq(1).should('contain', 'Using GridFS to chunk and store content.'); // Verify second answer's content


        cy.get('.answer').eq(0).should('contain', 'abhi3241'); // First answer author
        cy.get('.answer').eq(1).should('contain', 'mackson3332'); // Second answer author


        cy.visit("http://localhost:3000");
        cy.contains("Quick question about storage on android").click();
        // Check if the number of answers displayed matches the expected count
        cy.get('.answer').should('have.length', 1); // Assuming there are 3 answers in the fixture
        cy.get('.answer').should('contain', 'Store data in a SQLLite database.'); // Verify first answer's content
        
        
        cy.get('.answer').should('contain', 'ihba001'); // Second answer author
    });



    it('2.1 | should handle upvote and downvote', () => {
    // Simulate upvote
    cy.visit("http://localhost:3000");
    cy.contains("Programmatically navigate using React router").click();
    cy.get('.aVote').eq(0).click();
    cy.get('#formUserInput').type('sc971008');
    cy.get('#formPassInput').type('wssc19971008');
    cy.get('.form_postBtn').click();
    cy.contains("Programmatically navigate using React router").click();
    cy.get('.aVote').eq(0).click();
    cy.get('#voteCount').should('contain', '1'); // Assuming an initial vote count of 10

    // Simulate downvote
    cy.get('.aVote').eq(1).click();
    cy.get('#voteCount').should('contain', '-1'); // Should revert to original count

    cy.visit("http://localhost:3000");
    cy.contains("Object storage for a web application").click();
    cy.contains("🔺").click();
    cy.get('#voteCount').should('contain', '1'); // Assuming an initial vote count of 10

    // Simulate downvote
    cy.contains("🔻").click();
    cy.get('#voteCount').should('contain', '-1');
    
    cy.visit("http://localhost:3000");
    cy.contains("Quick question about storage on android").click();
    cy.contains("🔺").click();
    cy.get('#voteCount').should('contain', '1'); // Assuming an initial vote count of 10

    // Simulate downvote
    cy.contains("🔻").click();
    cy.get('#voteCount').should('contain', '-1');
    });


})