const Tag = require("../models/tags");
const Question = require("../models/questions");


const addTag = async (tname) => {
    
    let tagFound = await Tag.findOne({name: tname})
    if(tagFound){
        return tagFound._id;
    }else{
        let newTag = new Tag({name: tname})
        let savedTag = await newTag.save()
        return savedTag._id;
    }
};

const getQuestionsByOrder = async (order) => {
    let qlist = [];
    if (order == "active") {
        qlist = await Question.find({}).populate('tags').populate('answers')
        qlist = qlist.sort((q1,q2)=> {
            q1.answers.sort((a,b)=> b.ans_date_time - a.ans_date_time)
            q2.answers.sort((a,b)=> b.ans_date_time - a.ans_date_time)
            if(q1.answers.length == 0 && q2.answers.length == 0)
                return q2.ask_date_time - q1.ask_date_time
            else if(q1.answers.length == 0)
                return 1
            else if(q2.answers.length == 0)
                return -1
            else if(q2.answers[0].ans_date_time.getTime() == q1.answers[0].ans_date_time.getTime())
                return q2.ask_date_time - q1.ask_date_time
            else
                return q2.answers[0].ans_date_time - q1.answers[0].ans_date_time 
        })
    } else if (order == "unanswered") {
        qlist = await Question.find().populate('tags')
        qlist = qlist.filter(x => x.answers.length == 0).sort((a,b) => b.ask_date_time - a.ask_date_time)
    } else {
        qlist = await Question.find({})
        .populate('tags')
        await qlist.sort((a,b) => b.ask_date_time - a.ask_date_time);
    }
    return qlist
}

const filterQuestionsBySearch = (qlist, search) => {
    if(search=="")
        return qlist
    else
        return qlist.filter((q)=> {
            let titleWords = q.title.toLowerCase().split(" ")
            let textWords = q.text.toLowerCase().split(" ")
            let searchWords = search.toLowerCase().split(/\s+|\[|\]/)
            let searchTags = []
            let tag
            let regex = /\[(.*?)\]/g;
            while((tag = regex.exec(search.toLowerCase())) != null){
            searchTags.push(tag[1]);
            }
            let QuestionTags = q.tags.map(tag=>tag.name)

            return searchWords.some(searchWord => titleWords.includes(searchWord)||textWords.includes(searchWord)) 
            || searchTags.some(tag => QuestionTags.includes(tag));
        });
}


module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch };