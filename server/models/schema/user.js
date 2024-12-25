const mongoose = require("mongoose")
var Schema = mongoose.Schema
const { REACT_APP_API_URL } = require("../../config.js");


// Schema for users
var questionList = new Schema({
    name:{ type: String, required: true},
    questions:[{type:Schema.Types.ObjectId,ref:'Question'}]
})


const User = mongoose.Schema(
    {
        username:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        reg_date:{type:Date, required:true},
        profile_pic_url:{ type: String, default: "http://100.0.195.180:8000/images/default.jpg"},
        save_lists:[questionList],
        subscribes:[{type:Schema.Types.ObjectId,ref:'Question'}],
    },
    { collection: "User" }
)

// User.pre('save', function(next) {
//     const user = this;
//     const uniqueSubscribes = new Set(user.subscribes); // Convert array to Set to remove duplicates
//     if (uniqueSubscribes.size !== user.subscribes.length) { // Check if duplicates exist
//         const error = new Error('Subscribes array contains duplicate values');
//         return next(error); // Return error to prevent saving the document
//     }
//     next(); // Continue with the saving process if no duplicates are found
// });

module.exports = User;