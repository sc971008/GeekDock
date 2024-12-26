const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
mongoose.set('sanitizeFilter', true);
const User = require('../models/users');
const Question = require("../models/questions");


// adding user
const registerUser = async (req, res) => {
    // prevernt NoSQL injection
    try {
        let username = req.body.username.trim()
        let password = req.body.password.trim()

        //found username Match
        if (await User.findOne({ username: username })) {
            res.send({ message: `[${username}] Already registered` })
        } else {
            let newUser = await User.create({ username: username, password: password, reg_date: new Date() })
            res.send(newUser)
        }
    }
    catch (error) {
        // console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        let username = req.body.username.trim()
        let password = req.body.password.trim()
        console.log(username, password)
        //found username Match
        const userMongo = await User.findOne({ username: username })
        if (userMongo) {
            if (userMongo.password == password) {
                req.session.user = userMongo._id
                console.log(`[${req.session.user}] Login Success`)
                res.send(userMongo)
            } else {
                res.send({ message: "Password incorrect" })
            }
        } else {
            res.send({ message: "Username not found" })
        }
    }
    catch (error) {
        // console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const createNewList = async (req, res) => {
    console.log(`[${req.session.user}]creating new list [${req.body.listName}]`)
    try {
        //if logged in
        if (req.session.user) {
            //look for match User in DB
            let userMongo = await User.findById(req.session.user)
            //if list already exist
            if (userMongo.save_lists.some((list) => { return list.name == req.body.listName })) {
                console.log("User.save_lists already have this list")
                res.send({ message: 'User.save_lists already have this list' })
            }
            else {
                await userMongo.save_lists.push({ name: req.body.listName })
                // console.log(userMongo.save_lists)
                res.send(await userMongo.save())
            }
        }
        else {
            res.send({ message: 'User session not found' })
        }
    }
    catch (error) {
        // console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const saveQuestionToList = async (req, res) => {
    try {
        //if logged in

        if (req.session.user) {
            // console.log(`[${req.session.user}]saving [${req.body.qid}] to [${req.body.listName}]`)
            let userMongo = await User.findById(req.session.user)
            let targetList = await userMongo.save_lists.find((list) => { return list.name == req.body.listName })
            let question = await Question.findById(req.body.qid)

            if (targetList.questions.includes(question._id)) {
                res.send({ message: `List already have this question` })
                return
            }
            if (targetList && question) {
                // console.log(`[${userMongo.username}]saving [${question.title}] to [${targetList.name}]`)
                await targetList.questions.push(question)
                res.send(await userMongo.save())
                return
            }
        }
        else {
            res.send({ message: 'User session not found' })
        }
    }
    catch (error) {
        // console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error: Save question to list" });
    }
}

const subscribeQuestion = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'User session not found' });
        }
        const userId = req.session.user;
        const questionId = req.body.qid;

        // Retrieve user and question from database
        const user = await User.findById(userId);
        const question = await Question.findById(questionId);

        if (!user || !question) {
            return res.send({ message: 'User or question not found' });
        }

        // Check if the user is already subscribed to the question
        if (user.subscribes.includes(questionId)) {
            return res.send({ message: 'Already subscribed to this question' });
        }
        // Add question to user's subscribes list
        user.subscribes.push(questionId);
        await user.save();

        // Check if the question is already been followed by user
        if (question.subscribers.includes(userId)) {
            return res.send({ message: "Question already have this follower" })
        }
        // Add user to question's subscribers list
        question.subscribers.push(userId);
        await question.save();

        res.send({ message: 'Subscription successful' });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error: subscribeQuestion" });
    }
}

// In server/controller/user.js
const getSubscribedQuestionsWithNewAnswers = async (req, res) => {
    const { userId, lastCheck } = req.query;

    try {
        // Fetch the user to get their subscribed questions
        const user = await User.findById(userId).populate("subscribes");

        // Filter the subscribed questions to get those updated after the last check
        const updatedQuestions = user.subscribes.filter(
            (question) => question.last_updated > new Date(lastCheck)
        );

        res.json(updatedQuestions);
    } catch (error) {
        console.error("Error fetching subscribed questions with new answers", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getSessionUser = async (req, res) => {
    // console.log(`Get Session User Check : ${req.session.user}`)
    if (req.session.user) {
        const userMongo = await User.findById(req.session.user)
        if (userMongo) {
            res.send(userMongo)
        } else {
            res.send({ message: "Session No User Match in DB" })
        }
    }
    else {
        res.send({ message: 'User session not found' })
    }
}

//session checker
router.use((req, res, next) => {
    if (req.session.user) {
        console.log(`User Ctrl: Found User ${JSON.stringify(req.session)} Session`);
        next();
    } else {
        console.log(`Request Session: ${JSON.stringify(req.session)}`);
        console.log(`User Ctrl: No User Session Found`);
        next();
    }
})

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/getSessionUser', getSessionUser)

router.get('/subscribedQuestionsWithNewAnswers', getSubscribedQuestionsWithNewAnswers);

router.post('/subscribeQuestion', subscribeQuestion)

router.post('/createNewList', createNewList)

router.post('/saveQuestionToList', saveQuestionToList)

router.post("/logout", async (req) => {
    req.session.destroy()
})

module.exports = router;