const express = require("express");
const Answer = require("../models/answers");
const Question = require("../models/questions");


const router = express.Router();

// Adding answer
const addAnswer = async (req, res) => {
   try{
    const { qid, ans } = req.body;

    // Create a new answer
    let newAns = await Answer.create(ans);

    // Update the question's answers and last updated time
    await Question.findOneAndUpdate(
        { _id: qid },
        {
            $push: { answers: { $each: [newAns._id], $position: 0 } },
            $set: { last_updated: Date.now() }  // Set the last updated time
        },
        { new: true }

    );

    // Get the subscribers of the question
    const question = await Question.findById(qid).populate("subscribers");

    // Notify subscribers about the new answer (just a console.log for demonstration)
    question.subscribers.forEach((subscriber) => {
        console.log(`Notification for ${subscriber.username}: New answer added to question '${question.title}'`);
    });

    res.send(newAns);
    } catch(error){
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// get answers by username
const getAnswerByUser = async (req, res) => {
    console.log("Fetching answers for user:", req.params.username);
    try {
        const username = req.params.username;  // This should match the parameter in the route
        
        const answers = await Answer.find({ ans_by: username });
        if (!answers.length) {
            return res.send({ message: "No answers found for this user." });
        }
        res.json(answers);
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

router.post('/addAnswer',addAnswer);

router.get('/getAnswerByUser/:username', getAnswerByUser);

module.exports = router;
