import NewAnswer from '../../src/components/main/newAnswer/index';
import { addAnswer } from '../../src/services/answerService'; 
import { getUser } from '../../src/services/userService';


const createMockUser = async() => {
    return {username: 'mock_user',
     password: 'securepassword',  // Not needed for front-end tests
     reg_date: new Date().toISOString(),  // Use ISO format for consistent results
     profile_pic_url: 'http://localhost:8000/images/default.jpg',  // Default profile picture
     save_lists: [
       { name: 'Default List', questions: [] },  // Sample saved list
     ],
     subscribes: ['607f191e810c19729de860ea'],  // Sample ObjectId for subscribed questions
   }};



it('mounts', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerTextInput')
    cy.get('.form_postBtn')
})

it('shows error message when both input is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})


it('shows error message when text is empty', () => {
    cy.mount(<NewAnswer/>)
    cy.get('.form_postBtn').click()
    cy.get('div .input_error').contains('Answer text cannot be empty')
})

it('shows text inputted by user', () => {
    cy.mount(<NewAnswer/>)
    cy.get('#answerTextInput').should('have.value', '')
    cy.get('#answerTextInput').type('abc')
    cy.get('#answerTextInput').should('have.value', 'abc')
})


it('Should call addAnswer when Post Answer is clicked by a logged-in user', async () => {
    // Spy on addAnswer and stub getUser to return the mock user
    const mockUser = createMockUser();  // Create mock user
    cy.stub(getUser, 'call').resolves(mockUser);  // Ensure getUser returns the mock user when called
    const addAnswerSpy = cy.spy(addAnswer).as('addAnswerSpy');  // Spy to verify addAnswer call

    cy.mount(
      <NewAnswer qid="mockQuestionId" handleAnswer={() => {}} setPage={() => {}} />  // Render NewAnswer component with necessary props
    );
    
    const answerText = 'This is my answer text';
    
    // Input the answer text
    cy.get('textarea#answerTextInput').type(answerText);

    // Click the "Post Answer" button
    cy.get('.form_postBtn').click();

    // Verify that addAnswer is called with correct parameters
    cy.get('@addAnswerSpy').should('have.been.calledWith', 'mockQuestionId', {
      text: answerText,
      ans_by: 'mock_user',
      ans_date_time: new Date(),  // Check if the date/time is recent
    });
  });


it('handleAnswer is called when click Post Answer', async () => {
    const obj = {
        addAnswer: (arg) => {return arg}
    }
    const handleAnswer = cy.spy().as('handleAnswerSpy')
    cy.mount(<NewAnswer qid={123} addAnswer={obj.addAnswer} handleAnswer={handleAnswer} />)
    cy.get('#answerTextInput').type('abc')
    cy.get('.form_postBtn').click()
    cy.get('@handleAnswerSpy').should('have.been.calledWith', 123)
})





