import ProfilePage from '../../src/components/main/profilePage';
import ProfileActivity from '../../src/components/main/profilePage/activity';


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

  const createMockAnswer =  async() => {
    return{
      _id: `mockAnsId ${Math.random().toString(36).substring(7)}`,
      text: 'Sample Ans Text',
      ans_by: "sample user",
      ans_date_time: new Date().toISOString()
    }
  };
  

    it('Should render ProfilePage and switch views',  async() => {
      const mockUser = createMockUser();  // Mock user data
     
      cy.mount(
        <ProfilePage user={mockUser} clickTag={() => {}} handleAnswer={() => {}} />
      );
  
  
      // Ensure ProfileHeader renders correctly
      cy.get('.usename').contains(mockUser.username);
      cy.get('img').should('have.attr', 'src', mockUser.profile_pic_url);
      cy.get('.usename').contains(mockUser.reg_date);
    

      // Check initial view (User Summary)
      cy.contains('User Summary').should('be.visible');
  
      // Switch to "Saved Posts" view
      cy.contains('Saved Posts').click();
      cy.contains('Saved Posts').should('be.visible');  // Check that view is correct
  
      // Switch to "Subscriptions" view
      cy.contains('Subscriptions').click();
      cy.contains('Subscriptions').should('be.visible');
  
      // Switch to "Asked Questions" view
      cy.contains('Asked Questions').click();
      cy.contains('Asked Questions').should('be.visible');
  
      // Switch to "Answers" view
      cy.contains('Answers').click();
      cy.contains('Answers').should('be.visible');
  
      // Switch to "Votes" view
      cy.contains('Votes').click();
      cy.contains('Votes').should('be.visible');
    });


      it('Should render ProfileActivity and validate activities', async() => {
        const mockUser = createMockUser();  // Mock user data
        const mockSavedQuestions = [createMockQuestion()];  // Mock saved questions
 
        cy.mount(
          <ProfileActivity
            user={mockUser}
            saved={mockUser.save_lists}
            subscribes={mockUser.subscribes}
            clickTag={() => {}}
            handleAnswer={() => {}}
            fetchSaved={true}  // Simulate fetching saved questions
            fetchSubscribed={true}  // Simulate fetching subscribed questions
            fetchAsked={true}  // Simulate fetching asked questions
            fetchAnswers={true}  // Simulate fetching answers
          />
        );
    
        // Validate the rendering of questions and answers
        cy.get('.question').should('have.length', 0);  // Check if there's one saved question
        
        cy.contains('Saved Posts').click();  // Switch to "Saved Posts"
        cy.get('.question').should('have.length', mockSavedQuestions.length);  }); 


        it('Should render ProfileActivity and validate activities', async() => {
            const mockUser = createMockUser();  // Mock user data
            const mockSubscribedQuestions = [createMockQuestion()];  // Mock subscribed questions

        
            cy.mount(
              <ProfileActivity
                user={mockUser}
                saved={mockUser.save_lists}
                subscribes={mockUser.subscribes}
                clickTag={() => {}}
                handleAnswer={() => {}}
                fetchSaved={true}  // Simulate fetching saved questions
                fetchSubscribed={true}  // Simulate fetching subscribed questions
                fetchAsked={true}  // Simulate fetching asked questions
                fetchAnswers={true}  // Simulate fetching answers
              />
            );
        
            // Validate the rendering of questions and answers
            cy.get('.question').should('have.length', 0);  // Check if there's one saved question
            
            cy.contains('Subscriptions').click();  // Switch to "Subscriptions"
            cy.get('.question').should('have.length', mockSubscribedQuestions.length); }); 
        



            it('Should render ProfileActivity and validate activities', async() => {
                const mockUser = createMockUser();  // Mock user data
                const mockAskedQuestions = [createMockQuestion()];  // Mock asked questions
               
            
                cy.mount(
                  <ProfileActivity
                    user={mockUser}
                    saved={mockUser.save_lists}
                    subscribes={mockUser.subscribes}
                    clickTag={() => {}}
                    handleAnswer={() => {}}
                    fetchSaved={true}  // Simulate fetching saved questions
                    fetchSubscribed={true}  // Simulate fetching subscribed questions
                    fetchAsked={true}  // Simulate fetching asked questions
                    fetchAnswers={true}  // Simulate fetching answers
                  />
                );
            
                // Validate the rendering of questions and answers
                cy.get('.question').should('have.length', 0);  // Check if there's one saved question
                
                cy.contains('Asked Questions').click();  // Switch to "Asked Questions"
                cy.get('.question').should('have.length', mockAskedQuestions.length);  }); 
        
      
    
 
                it('Should render ProfileActivity and validate activities', async() => {
                    const mockUser = createMockUser();  // Mock user data
                    const mockAnswers = [createMockAnswer()];  // Mock answers
                
                    cy.mount(
                      <ProfileActivity
                        user={mockUser}
                        saved={mockUser.save_lists}
                        subscribes={mockUser.subscribes}
                        clickTag={() => {}}
                        handleAnswer={() => {}}
                        fetchSaved={true}  // Simulate fetching saved questions
                        fetchSubscribed={true}  // Simulate fetching subscribed questions
                        fetchAsked={true}  // Simulate fetching asked questions
                        fetchAnswers={true}  // Simulate fetching answers
                      />
                    );
                
                    // Validate the rendering of questions and answers
                    cy.get('.question').should('have.length', 0);  // Check if there's one saved question
                    
                    cy.contains('Answers').click();  // Switch to "Answers"
                    cy.get('.answerText').should('have.length', mockAnswers.length);  // Validate answers
        
       
      });

    

