import AnswerHeader from '../../src/components/main/answerPage/header';



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

it('Verify AnswerHeader interactions', async() => {
    const handleSubscribe = cy.spy().as('handleSubscribeSpy');
    const handleNewQuestion = cy.spy().as('handleNewQuestionSpy');
    const handleSave = cy.spy().as('handleSaveSpy');
    const setPage = cy.spy().as('setPageSpy');
    let mockQuestion = await createMockQuestion();

    cy.mount(
      <AnswerHeader
        user={{ username: 'testuser' }}
        question={mockQuestion}
        ansCount={mockQuestion.answers.length}
        title={mockQuestion.title}
        handleSubscribe={handleSubscribe}
        handleNewQuestion={handleNewQuestion}
        setPage={setPage}
        handleSave={handleSave}
      />
    );

    // Verify save button
    cy.get('.greenbtn').eq(1).click();  // Click on save
    cy.get('@handleSaveSpy').should('have.been.called');

    // Verify "Ask a Question" button
    cy.get('.bluebtn').click();  // Click on ask a question
    cy.get('@handleNewQuestionSpy').should('have.been.called');
  });