const mongoose = require("mongoose");

module.exports = mongoose.Schema(
    {
        name: {type:String, require:true}
    },
    { collection: "Tag" }
);
