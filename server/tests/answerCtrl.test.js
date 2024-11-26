// Unit tests for addAnswer in contoller/answer.js

const supertest = require("supertest")
const { default: mongoose } = require("mongoose");

const Answer = require("../models/answers");
const Question = require("../models/questions");

// Mock the Answer model
jest.mock("../models/answers");
jest.mock("../models/questions")

let server;
describe("POST /addAnswer", () => {

  beforeEach(() => {
    server = require("../server");
  })

  afterEach(async() => {
    server.close();
    await mongoose.disconnect()
  });

  it("should add a new answer to the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer"
      }
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer"
    }

    const mockQuestion ={
      title:"dummyQuestionTitle",
      subscribers:[{username:"user1"},{username:"user2"}]
      
    }

    const mockQuest ={
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"],
      last_updated: "test time",
    }

    // Mock the create method of the Answer model
    Answer.create.mockResolvedValueOnce(mockAnswer);
    Question.findById = jest.fn().mockImplementation(()=>(
      {
        populate: jest.fn().mockResolvedValueOnce(mockQuestion),
      }
    ))

    // Mocking the Question.findOneAndUpdate method
    Question.findOneAndUpdate = jest.fn().mockResolvedValueOnce(mockQuest);

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);

    // Verifying that Answer.create method was called with the correct arguments
    expect(Answer.create).toHaveBeenCalledWith({
      text: "This is a test answer"
    });


  });

  it("should ErrorMsg if some error when trying", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer"
      }
    };

    Answer.create = jest.fn().mockRejectedValueOnce(new Error("random error when create ans"))
    
    // Making the request
    const response = await supertest(server)
    .post("/answer/addAnswer")
    .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  })

});

describe("GET /getAnswerByUser",()=>{
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should return Ans by user",async()=>{
    // Mock request parameters
    const mockReqParams = {
      username: "user3",
    };

    const mockAns = ["an1","ans2","ans3"]

    Answer.find = jest.fn().mockResolvedValueOnce(mockAns)

    const response = await supertest(server).get(
      `/answer/getAnswerByUser/${mockReqParams.username}`
    );
    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAns);
  })

  it("should ErrroMsg if find() return empty list", async () => {
      // Mock request parameters
      const mockReqParams = {
        username: "user3",
      };
      
      // Provide mock question data
      Answer.find = jest.fn().mockResolvedValueOnce([])
      
      // Making the request
      const response = await supertest(server).get(
        `/answer/getAnswerByUser/${mockReqParams.username}`
      );

      // Asserting the response
      expect(response.status).toBe(200);
      expect(response.body).toEqual({message: "No answers found for this user."});
  })

  it("should ErrroMsg if random error try finding", async () => {
    // Mock request parameters
    const mockReqParams = {
      username: "user3",
    };
    
    const mockPopulatedAns = []
    // Provide mock question data
    Answer.find = jest.fn().mockImplementation(()=> {throw new Error("random error finding")})
    
    // Making the request
    const response = await supertest(server).get(
      `/answer/getAnswerByUser/${mockReqParams.username}`
    );

    // Asserting the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({message: "Internal server error"});
})
  

})
