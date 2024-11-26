const supertest = require("supertest");
const { default: mongoose } = require("mongoose");
const User = require("../models/users");
const Question = require("../models/questions");
jest.mock("../models/users");
jest.mock("../models/questions")

// Mocking Session Request
let mockSessionUser = "fakeMongoId"
jest.mock('express-session', () => {
    return () => (req,res,next)=>{
        req.session={
            user : mockSessionUser, 
            destroy: jest.fn(()=>{
                mockSessionUser = null
            })
        }
        next()
    }
})

let server;

describe("POST /registerUser", () => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should return new user Object", async () => {
        //mockReqBody
        const mockUser={
            username:"fakeUsername",
            password:"fakePassword"
        }

        User.create = jest.fn().mockResolvedValueOnce(mockUser)
        
        // Making the request
        const response = await supertest(server)
        .post("/user/register")
        .send(mockUser);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    it("should ErrorMsg if username already exist in DB", async () => {
        //mockReqBody
        const mockUser={
            username:"fakeUsername",
            password:"fakePassword"
        }

        User.findOne = jest.fn().mockResolvedValueOnce(mockUser)
        
        // Making the request
        const response = await supertest(server)
        .post("/user/register")
        .send(mockUser);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: `[${mockUser.username}] Already registered`});
    });

    it("should ErrorMsg if error happen trying", async () => {
        //mockReqBody
        const mockUser={
            username:"fakeUsername",
            password:"fakePassword"
        }

        User.findOne = jest.fn().mockRejectedValueOnce(new Error("random Error"))
        
        // Making the request
        const response = await supertest(server)
        .post("/user/register")
        .send(mockUser);

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    });
});

describe("POST /login",() => {
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });
    
    it("should assign user_id to req.session.user", async()=>{
        //mockReqBody
        const mockUser={
            _id:"123123123",
            username:"fakeUsername",
            password:"fakePassword"
        }       
        
        User.findOne = jest.fn().mockResolvedValueOnce(mockUser)

        // Making the request
        const response = await supertest(server)
        .post("/user/login")
        .send(mockUser);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);

    })

    it("ErrorMsg if username not found", async()=>{
        const mockUser={
            _id:"123123123",
            username:"fakeUsername",
            password:"fakePassword"
        }

        User.findOne = jest.fn().mockResolvedValueOnce(null)

        // Making the request
        const response = await supertest(server)
        .post("/user/login")
        .send(mockUser);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Username not found"});
    })
    it("ErrorMsg if password not correct", async()=>{
        const mockReq={
            _id:"123123123",
            username:"fakeUsername",
            password:"fakePasswordFromReq"
        }
        const mockUser={
            _id:"123123123",
            username:"fakeUsername",
            password:"fakePasswordFromDB"
        }

        User.findOne = jest.fn().mockResolvedValueOnce(mockUser)

        // Making the request
        const response = await supertest(server)
        .post("/user/login")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: "Password incorrect"});
    })
    it("ErrorMsg if error when trying", async()=>{
        const mockReq={
            _id:"123123123",
            username:"fakeUsername",
            password:"fakePasswordFromReq"
        }

        User.findOne = jest.fn().mockRejectedValueOnce(new Error("random error"))

        // Making the request
        const response = await supertest(server)
        .post("/user/login")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    })
})

describe("GET /getSessionUser",()=>{
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should return user", async() => {

        const mockUser = {
            _id:"123132",
            username:"fakeuser"
        }
        User.findById = jest.fn().mockResolvedValueOnce(mockUser)

        // Making the request
        const response = await supertest(server)
        .get("/user/getSessionUser")
        .send();
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);

    })

    it("ErrorMsg if No Match in DB", async() => {


        User.findById = jest.fn().mockResolvedValueOnce(null)

        // Making the request
        const response = await supertest(server)
        .get("/user/getSessionUser")
        .send();
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message:"Session No User Match in DB"});
    })
    it("ErrorMsg if No User info in req.session", async() => {

        //remove session user
        mockSessionUser=null

        // Making the request
        const response = await supertest(server)
        .get("/user/getSessionUser")
        .send();

        mockSessionUser="fakeuserid"
        
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'User session not found'});
    })
})

describe("POST /createNewList",()=>{
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should get updated user if added new list",async()=>{
        const mockList = {
            listName: "list123"
        }

        const mockUser = {
            save_lists : [{name:"list789"},{name:"listname654"}],
            save: jest.fn().mockResolvedValueOnce({
                save_lists : [{name:"list789"},{name:"listname654"},{name:"list123"}]
            })
        }
        const mockUserNew = {
            save_lists : [{name:"list789"},{name:"listname654"},{name:"list123"}]

        }

        User.findById = jest.fn().mockResolvedValueOnce(mockUser)

        // Making the request
        const response = await supertest(server)
        .post("/user/createNewList")
        .send(mockList);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUserNew);
    })

    it("ErrorMsg if user already have list with same name",async()=>{
        const mockList = {
            listName: "list123"
        }

        const mockUser = {
            save_lists : {
                some: jest.fn().mockResolvedValueOnce(true)
            }
        }


        User.findById = jest.fn().mockResolvedValueOnce(mockUser)

        // Making the request
        const response = await supertest(server)
        .post("/user/createNewList")
        .send(mockList);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'User.save_lists already have this list'});
    })
    it("ErrorMsg if user session not found",async()=>{
        const mockList = {
            listName: "list123"
        }

        //remove session user
        mockSessionUser=null
        // Making the request
        const response = await supertest(server)
        .post("/user/createNewList")
        .send(mockList);
        //reset session user
        mockSessionUser="fakeUserId"
        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'User session not found'});
    })
    it("ErrorMsg if error happen trying",async()=>{
        const mockList = {
            listName: "list123"
        }

        User.findById = jest.fn().mockRejectedValueOnce(new Error("random error trying to createNewList"))
        // Making the request
        const response = await supertest(server)
        .post("/user/createNewList")
        .send(mockList);

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error" });
    })

})

describe("POST /saveQuestionToList",()=>{
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("should get updated user if question saved to list",async()=>{
        const mockReq ={
            qid:678,
            listName:"fakeListname"
        }

        const mockUserNew = {
            save_lists : 
                    {
                        name:"fakelist",
                        questions:[{_id:123},{_id:456},{_id:678}]
                    }
        }
        const mockUser = {
            save_lists : {
                find: jest.fn().mockResolvedValueOnce(
                    {
                        name:"fakelist",
                        questions:[{_id:123},{_id:456}]
                    }
                )
            },
            save: jest.fn().mockResolvedValueOnce({
                save_lists : 
                        {
                            name:"fakelist",
                            questions:[{_id:123},{_id:456},{_id:678}]
                        }
            })
        }



        User.findById = jest.fn().mockResolvedValueOnce(mockUser)
        Question.findById = jest.fn().mockResolvedValueOnce({_id:678})

        // Making the request
        const response = await supertest(server)
        .post("/user/saveQuestionToList")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUserNew);
    })

    it("should ErrMsg if list already have this question",async()=>{
        const mockReq ={
            qid:123,
            listName:"fakeListname"
        }

        const mockUser = {
            save_lists : {
                find: jest.fn().mockResolvedValueOnce(
                    {
                        name:"fakelist",
                        questions:[123,456]
                    }
                )
            }
        }

        User.findById = jest.fn().mockResolvedValueOnce(mockUser)
        Question.findById = jest.fn().mockResolvedValueOnce({_id:123})

        // Making the request
        const response = await supertest(server)
        .post("/user/saveQuestionToList")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message:`List already have this question`});        
    })

    it("should ErrMsg if user session not found ",async()=>{

        //remove session user
        mockSessionUser=null

        // Making the request
        const response = await supertest(server)
        .post("/user/saveQuestionToList")
        .send();

        //reset session user
        mockSessionUser="fakeUserId"

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message: 'User session not found'});        
    })

    it("should ErrMsg if error trying saveQuestionToList",async()=>{

        User.findById = jest.fn().mockRejectedValueOnce(new Error("random error trying saveQuestionToList"))
        Question.findById = jest.fn().mockResolvedValueOnce({_id:123})

        // Making the request
        const response = await supertest(server)
        .post("/user/saveQuestionToList")
        .send();

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error: Save question to list" });        
    })




})

describe("POST /subscribeQuestion",()=>{
    beforeEach(() => {
        server = require("../server");
    });

    afterEach(async () => {
        server.close();
        await mongoose.disconnect();
    });

    it("Should get successful msg",async()=>{
        const mockReq ={
            qid:678,
        }
        const mockUser = {
            subscribes:[99123,99678],
            save:jest.fn().mockResolvedValueOnce()
        }
        const mockQuest = {
            subscribers:[321,456],
            save:jest.fn().mockResolvedValueOnce()
        }

        const mockUserNew = {
            subscrbes:[99123,99678,678],
        }
        const mockQuestNew = {
            subscribers:[321,456,mockSessionUser],
        }

        User.findById = jest.fn().mockResolvedValueOnce(mockUser)
        Question.findById = jest.fn().mockResolvedValueOnce(mockQuest)

        // Making the request
        const response = await supertest(server)
        .post("/user/subscribeQuestion")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Subscription successful'});
    })

    it("Should ErrorMsg if UserOrQuestion not found",async()=>{
        User.findById = jest.fn().mockResolvedValueOnce(null)
        Question.findById= jest.fn().mockResolvedValueOnce(null)

        // Making the request
        const response = await supertest(server)
        .post("/user/subscribeQuestion")
        .send();

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'User or question not found' });
    })

    it("Should ErrorMsg if user already subscribed this question",async()=>{
        const mockReq ={
            qid:678,
        }
        const mockUser = {
            subscribes:[99123,99678,678],
            save:jest.fn().mockResolvedValueOnce()
        }
        const mockQuest = {
            subscribers:[321,456],
            save:jest.fn().mockResolvedValueOnce()
        }

        User.findById = jest.fn().mockResolvedValueOnce(mockUser)
        Question.findById= jest.fn().mockResolvedValueOnce(mockQuest)

        // Making the request
        const response = await supertest(server)
        .post("/user/subscribeQuestion")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Already subscribed to this question' });
    })

    it("Should ErrorMsg if question already have this follower",async()=>{
        const mockReq ={
            qid:678,
        }
        const mockUser = {
            subscribes:[99123,99678],
            save:jest.fn().mockResolvedValueOnce()
        }
        const mockQuest = {
            subscribers:[321,456,mockSessionUser],
            save:jest.fn().mockResolvedValueOnce()
        }

        User.findById = jest.fn().mockResolvedValueOnce(mockUser)
        Question.findById= jest.fn().mockResolvedValueOnce(mockQuest)

        // Making the request
        const response = await supertest(server)
        .post("/user/subscribeQuestion")
        .send(mockReq);

        // Asserting the response
        expect(response.status).toBe(200);
        expect(response.body).toEqual({message:"Question already have this follower"});
    })

    it("Should ErrorMsg if random error happen trying subscribeQuestion",async()=>{

        User.findById = jest.fn().mockRejectedValueOnce(
            new Error("random error happen trying subscribeQuestion")
        )

        // Making the request
        const response = await supertest(server)
        .post("/user/subscribeQuestion")
        .send();

        // Asserting the response
        expect(response.status).toBe(500);
        expect(response.body).toEqual({ message: "Internal server error: subscribeQuestion" });
    })
})