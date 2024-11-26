const supertest = require("supertest");
const { default: mongoose } = require("mongoose");
const Vote = require("../models/votes");
jest.mock("../models/votes")
const Question = require("../models/questions");
jest.mock("../models/questions")


let server

describe("POST /voteQuestionById", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should get Updated Question",async()=>{
        const mockReq={
            qid:20,
            voteType:1,
            user:`fakeuser`
        }
        const mockQuest ={
            qid:20
        }
        const mockVote = {
            value: 0,
            save: jest.fn().mockResolvedValueOnce(null)
        }
        Vote.findOne = jest.fn().mockResolvedValueOnce(mockVote)
        Vote.aggregate = jest.fn().mockResolvedValueOnce([[1,2,3]])
        Question.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockQuest)

        // Making the request
        const response = await supertest(server)
        .post("/vote/voteQuestionById/")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockQuest);
    })

    it("should ErrorMsg if random error happen trying Vote",async()=>{

        Vote.findOne = jest.fn().mockResolvedValueOnce(new Error(" random error happen trying Vote"))


        // Making the request
        const response = await supertest(server)
        .post("/vote/voteQuestionById/")
        .send();

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error: /voteQuestionById" });
    })

});

describe("GET /getUserVoteHistory/:username", ()=>{
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should get list of votes",async()=>{
        mockVotes=[1,2,3]
        Vote.find = jest.fn().mockImplementation(() => ({
            populate: jest.fn().mockResolvedValueOnce(mockVotes),
        }));

        const response = await supertest(server)
        .get("/vote/getUserVoteHistory/FakeUsername")

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockVotes);
    })

    it("should ErrorMsg if random error trying getUserVoteHistory",async()=>{
        mockVotes=[1,2,3]
        Vote.find = jest.fn().mockImplementation(() => ({
            populate: jest.fn().mockImplementation(()=>{ throw new Error("random error trying getUserVoteHistory")}),
        }));

        const response = await supertest(server)
        .get("/vote/getUserVoteHistory/FakeUsername")

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error: /getUserVoteHistory" });
    })
})