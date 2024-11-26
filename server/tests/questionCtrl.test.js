// unit tests for functions in controller/question.js

const supertest = require("supertest");
const { default: mongoose } = require("mongoose");

const Question = require("../models/questions");
const {
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
} = require("../utils/question");

// Mocking the models
jest.mock("../models/questions");
jest.mock("../utils/question", () => ({
  addTag: jest.fn(),
  getQuestionsByOrder: jest.fn(),
  filterQuestionsBySearch: jest.fn(),
}));

let server;

const tag1 = {
  _id: "507f191e810c19729de860ea",
  name: "tag1",
};
const tag2 = {
  _id: "65e9a5c2b26199dbcc3e6dc8",
  name: "tag2",
};

const ans1 = {
  _id: "65e9b58910afe6e94fc6e6dc",
  text: "Answer 1 Text",
  ans_by: "answer1_user",
};

const ans2 = {
  _id: "65e9b58910afe6e94fc6e6dd",
  text: "Answer 2 Text",
  ans_by: "answer2_user",
};

const user1 = {
  _id: "66205034b42aeee01655dc36",
  username: "user1"
}

const user2 = {
  _id: "66205034b42aeee01655dc3a",
  username: "user2"
}

const mockQuestions = [
  {
    _id: "65e9b58910afe6e94fc6e6dc",
    title: "Question 1 Title",
    text: "Question 1 Text",
    tags: [tag1],
    answers: [ans1],
    views: 21,
    asked_by: "user1",
  },
  {
    _id: "65e9b5a995b6c7045a30d823",
    title: "Question 2 Title",
    text: "Question 2 Text",
    tags: [tag2],
    answers: [ans2],
    views: 99,
    asked_by: "user2",
  },
  {
    _id: "65e9b5a995b6c7045a30d824",
    title: "Question 3 Title",
    text: "Question 3 Text",
    tags: [tag2],
    answers: [ans2],
    views: 99,
    asked_by: "user1",
  },
];

describe("GET /getQuestion", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should return questions by filter", async () => {
    // Mock request query parameters
    const mockReqQuery = {
      order: "someOrder",
      search: "someSearch",
    };

    getQuestionsByOrder.mockResolvedValueOnce(mockQuestions);
    filterQuestionsBySearch.mockReturnValueOnce(mockQuestions);
    // Making the request
    const response = await supertest(server)
      .get("/question/getQuestion")
      .query(mockReqQuery);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestions);
  });
});

describe("GET /getQuestionById/:qid", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should return a question by id and increment its views by 1", async () => {
    // Mock request parameters
    const mockReqParams = {
      qid: "65e9b5a995b6c7045a30d823",
    };

    const mockPopulatedQuestion = {
      answers: [
        mockQuestions.filter((q) => q._id == mockReqParams.qid)[0]["answers"],
      ], // Mock answers
      views: mockQuestions[1].views + 1,
    };

    // Provide mock question data
    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockImplementation(()=>({
          populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestion),
      })),
  }));

    // Making the request
    const response = await supertest(server).get(
      `/question/getQuestionById/${mockReqParams.qid}`
    );

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });

  it("should throw expection if input format is wrong", async () => {
    // Mock request parameters
    const mockReqParams = {
      qid: "65e9",
    };
    // Mock PopulateQuestion
    const mockPopulatedQuestion = {};

    Question.findOneAndUpdate = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockImplementation({
          populate: jest.fn().mockRejectedValue(new Error("Mock populate error")),
      }),
  }));

    // Making the request
    const response = await supertest(server).get(
      `/question/getQuestionById/${mockReqParams.qid}`
    );

    // Asserting the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });

  it("should return null if no match found", async () => {
    // Mock request parameters
    const mockReqParams = {
      qid: "65e9b5a995b6c7045a30d823",
    };
    // Mock PopulateQuestion
    const mockPopulatedQuestion = {};

    // Provide mock question data
    Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);

    // Making the request
    const response = await supertest(server).get(
      `/question/getQuestionById/${mockReqParams.qid}`
    );

    // Asserting the response
    expect(response.status).toBe(404);
    expect(response.body).toEqual(mockPopulatedQuestion);
  });
});

describe("GET /getQuestionByUser/:username",()=>{
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should return all questions by username",async()=>{
    // Mock request parameters
    const mockReqParams = {
      username: "user1",
    };

    //Mock result
    const mockPopulatedQuestions = [
      {
        title:"Question 1 Title", // Mock title
        asked_by: "user1",
      },
      {
        title:"Question 3 Title", // Mock title
        asked_by: "user1",
      },
    ];

    // Provide mock question data
    Question.find = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValueOnce(mockPopulatedQuestions),
    }));

    // Making the request
    const response = await supertest(server).get(
      `/question/getQuestionByUser/${mockReqParams.username}`
    );

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPopulatedQuestions);
  })

  it("should ErrorMsg if find() return empty list ",async()=>{
    // Mock request parameters
    const mockReqParams = {
      username: "user3",
    };


    // Provide mock question data
    Question.find = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValueOnce([]),
    }));

    // Making the request
    const response = await supertest(server).get(
      `/question/getQuestionByUser/${mockReqParams.username}`
    );

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({message:"No questions found for this user."});
  })

  it("should ErrorMsg if other Error happen trying", async()=>{
      // Mock request parameters
      const mockReqParams = {
        username: "user3",
      };
  
      //Mock result
      const mockPopulatedQuestions = { message: "Internal server error" }

      // Provide mock question data
      Question.find = jest.fn().mockImplementation(() => ({
        populate: jest.fn().mockRejectedValueOnce(new Error("random error when populate")),
      }));
      
      // Making the request
      const response = await supertest(server).get(
        `/question/getQuestionByUser/${mockReqParams.username}`
      );

      // Asserting the response
      expect(response.status).toBe(500);
      expect(response.body).toEqual({message: "Internal server error"});
  })

})



describe("POST /addQuestion", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should add a new question", async () => {
    // Mock request body

    const mockTags = [tag1, tag2];

    const mockQuestion = {
      _id: "65e9b58910afe6e94fc6e6fe",
      title: "Question 3 Title",
      text: "Question 3 Text",
      tags: [tag1, tag2],
      answers: [ans1],
    };

    addTag.mockResolvedValueOnce(mockTags);
    Question.create.mockResolvedValueOnce(mockQuestion);

    // Making the request
    const response = await supertest(server)
      .post("/question/addQuestion")
      .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockQuestion);
  });

  it("should ErrorMsg if addTag went wrong",async()=>{
    const mockTags = [tag1, tag2];

    const mockQuestion = {
      _id: "65e9b58910afe6e94fc6e6fe",
      title: "Question 3 Title",
      text: "Question 3 Text",
      tags: [tag1, tag2],
      answers: [ans1],
    };

    addTag.mockRejectedValueOnce(new Error("Random error happen during addTag"));
    // Making the request
    const response = await supertest(server)
    .post("/question/addQuestion")
    .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({message: "Error adding tag"});
  })

  it("should ErrorMsg if addQuestion went wrong",async()=>{
    // Mock request body
    const mockTags = [tag1, tag2];
    const mockQuestion = {
      _id: "65e9b58910afe6e94fc6e6fe",
      title: "Question 3 Title",
      text: "Question 3 Text",
      tags: [tag1, tag2],
      answers: [ans1],
    };

    addTag.mockResolvedValueOnce(mockTags);
    Question.create.mockRejectedValueOnce(new Error("Random error happen during addQuestion"));
    // Making the request
    const response = await supertest(server)
    .post("/question/addQuestion")
    .send(mockQuestion);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({message:"Error adding question"});

  })
});
