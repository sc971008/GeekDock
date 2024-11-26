const express = require("express");
const Question = require("../models/questions");
const { addTag, getQuestionsByOrder, filterQuestionsBySearch } = require('../utils/question');


const router = express.Router();


// To add Question
const addQuestion = async (req, res) => {
    let question = req.body
    // console.log(question)
    try{
        for (let i = 0; i < question.tags.length; i++) {
            question.tags[i] = await addTag(question.tags[i]);
        }
        // console.log(question)
    }
    catch(err){
        console.error("Error adding tag----------:", err);
        res.status(500).send({message: "Error adding tag"});
    }
 
    try{
        console.log("Question added" + question)
        res.send(await Question.create(question));
    }
    catch(err){
        console.error("Error adding question---------:", err);
        res.status(500).send({message:"Error adding question"});
    }
};

// To get Questions by Filter
const getQuestionsByFilter = async (req, res) => {
    res.send(await filterQuestionsBySearch(await getQuestionsByOrder(req.query.order),req.query.search))
};

// To get Questions by Id
const getQuestionById = async (req, res) => {
    let qid = req.params.qid
    try{
        res.send(await Question.findOneAndUpdate(
            { _id: qid },
            { $inc: { views: 1 } }, // Increment the `views` field by 1
            { new: true } // Return the updated document
            ).populate('answers').populate('tags')
        )
    }
    catch(err){
        res.status(404)
        res.send(err)        
    }
};

// get questions by username
const getQuestionByUser = async (req, res) => {
    console.log("Fetching questions for user:", req.params.username);

    try {
        const username = req.params.username;  // This should match the parameter in the route
        const questions = await Question.find({ asked_by: username }).populate('tags');
        if(!questions.length){
            return res.json({message:"No questions found for this user."})
        }
        res.json(questions)

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};





// add appropriate HTTP verbs and their endpoints to the router
router.get('/getQuestion',getQuestionsByFilter)

router.get('/getQuestionById/:qid',getQuestionById);

router.get('/getQuestionByUser/:username', getQuestionByUser);

router.post('/addQuestion',addQuestion)


module.exports = router;
