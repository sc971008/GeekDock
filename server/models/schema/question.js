const mongoose = require("mongoose");

var Schema = mongoose.Schema

// Schema for questions
var Question = new Schema(
    {
        // define the relevant properties.
        title: { type: String, required: true },
        text: { type: String, required: true },
        asked_by: { type: String, required: true },
        ask_date_time: { type: Date, required: true },
        views: { type: Number, required: true, default: 0 },
        vote: { type: Number, required: true, default: 0 },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
        answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
        subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],  // New field to track subscribers
        last_updated: { type: Date, default: Date.now },  // New field to track when the question was last updated
    },
    { collection: "Question" }
);

// Question.virtual('activeDate').get(function(){
//     if(this.answers.length == 0)
//         return this.ask_date_time
//     else{
//         this.answers.sort((a,b)=>b.ans_date_time - a.ans_date_time)[0].ans_date_time
//     }
// })
module.exports = mongoose.Schema(Question);
