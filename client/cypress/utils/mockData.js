// utils/mockData.js

const createMockQuestion = () => ({
    _id: 'mockQuestionId',
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
  });
  
  const createMockAnswer = () => ({
    _id: 'mockAnswerId',
    text: 'Sample Answer Text',
    ans_by: 'sampleAnswerUser',
    ans_date_time: new Date().toISOString(),
  });
  
  export { createMockQuestion, createMockAnswer };
  