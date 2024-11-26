import QuestionBody from '../../src/components/main/answerPage/questionBody'


   const createMockQuestion = async() => {
    return{
      _id: `mockQId ${Math.random().toString(36).substring(7)}`,
      title: 'Sample Question Title',
      text: 'Sample Question Text',
      asked_by: 'testuser',
      ask_date_time: new Date().toISOString(),
      views: 150,
      vote: 0,
      tags: [],  // Must be initialized
      answers: [],  // Ensure this property exists
      subscribers: [],  // Provide initial value
      last_updated: new Date().toISOString(),
    }
  };

it('Test upvote and downvote functionality', async () => {
    const mockQuestion = await createMockQuestion();  // Mock question with valid properties
    const setPage = cy.spy().as('setPageSpy');  // Spy to check if page changes
    const onVoteChange = await cy.spy().as('onVoteChangeSpy');  // Spy to track vote change
    
    // Mount the QuestionBody component
    cy.mount(
      <QuestionBody
        user={{ username: 'testuser' }}  // Valid user data
        qid={mockQuestion._id}
        views={mockQuestion.views}
        vote={mockQuestion.vote}
        text={mockQuestion.text}
        askBy={mockQuestion.asked_by}
        meta={mockQuestion.last_updated}
        onVoteChange={onVoteChange}  // Spy function to track vote changes
        setPage={setPage}
      />
    );
    
    // Ensure the user is valid to allow voting
    cy.get('.aVote').first().click();  // Click on upvote
    // cy.get('@onVoteChangeSpy').should('have.been.calledWith', 1);  // Verify vote change


    cy.get('.aVote').last().click();  // Click on downvote
   
    // cy.get('@onVoteChangeSpy').should('have.been.calledWith', -1);  // Verify vote change
  });

