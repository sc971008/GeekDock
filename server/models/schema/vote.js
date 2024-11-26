const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const Vote =  new Schema(
    {
        question: {type:Schema.Types.ObjectId, ref:"Question", required: true},
        user: {type:String, required:true},
        value: {type:Number, required: true}

        

    },
    {collection: "Vote"}
);

module.exports = Vote;