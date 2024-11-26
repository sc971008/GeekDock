// Pass URL of your mongoDB instance as first argument
const { MONGO_URL } = require("./config");
let mongoose = require('mongoose');

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const clearDatabase = async () => {
    // Clear each collection
    await db.dropDatabase();

    console.log('Database cleared');
    if (db) db.close();
}

clearDatabase()
    .catch((err) => {
        console.log('ERROR: ' + err);
        if (db) db.close();
    });

console.log('Processing ...');
