const express = require("express");
const Vote = require("../models/votes");
const Question = require("../models/questions");
const router = express.Router();

const getUserVoteHistory = async (req, res) => {
    const username = req.params.username; 

    try {
        const votes = await Vote.find({ user: username }).populate({
            path:'question',
            populate:{path:'tags'}
            });
        if (!votes.length) {
            return res.send({ message: "No votes found for this user." });
        }
        res.json(votes);
    } catch (error) {
        console.error("Error retrieving vote history:", error);
        res.status(500).json({ message: "Internal server error: /getUserVoteHistory" });
    }
};

const voteQuestionById = async (req, res) => {

    const qid =req.body.qid;
    const user= req.body.user;
    const voteType = req.body.voteType;

    try{
        let vote= await Vote.findOne({question:qid, user:user});
        if(vote) {
            vote.value = voteType;
        } else {
            vote = new Vote({question:qid, user:user, value: voteType});
        }
        await vote.save();

        const mongoose = require('mongoose');
        const ObjectId = mongoose.Types.ObjectId;
        
        const totalVotes = await Vote.aggregate([
            { $match: { question: new ObjectId(qid) } },
            { $group: { _id: null, sum: { $sum: "$value" } } }
        ]);
        
        console.log("Aggregated Votes:", totalVotes);
        const question= await Question.findByIdAndUpdate(qid, {vote: totalVotes[0].sum}, {new:true});
        res.send(question);
    } catch(err){
        console.error('Error when upvoting:', err);
        res.status(500).json({ message: "Internal server error: /voteQuestionById" });
    }
};




router.get('/getUserVoteHistory/:username', getUserVoteHistory)

router.post('/voteQuestionById/',voteQuestionById)

module.exports = router;