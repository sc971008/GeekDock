const express = require("express");
const Tag = require("../models/tags");
const Question = require("../models/questions");

const router = express.Router();

const getTagsWithQuestionNumber = async (req, res) => {
    let qlist = await Question.find().populate('tags')
    let taglist = await Tag.find()

    for (let i = 0; i < taglist.length; i++) {
        taglist[i] = {name:taglist[i].name,qcnt:0}
    }


    qlist.map((q)=>{ // for every question
       q.tags.map((t)=>{ // for every tags in dat question
            let doc = taglist.find((doc)=> doc.name == t.name)
            doc.qcnt +=1
        })
    })

    res.send(taglist)
};

// add appropriate HTTP verbs and their endpoints to the router.
router.get('/getTagsWithQuestionNumber',getTagsWithQuestionNumber)

module.exports = router;
