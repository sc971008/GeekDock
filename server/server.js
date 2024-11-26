// Application server

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const cors = require("cors");
const { MONGO_URL, CLIENT_URL,port } = require("./config");
const app = express();
const fs = require('fs');
const logStream = fs.createWriteStream('server.log', { flags: 'a' });

mongoose.set('sanitizeFilter', true);
mongoose.connect(MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use((req, res, next) => {
  const logEntry = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${req.ip}`;
  console.log ('Request URL:', req.originalUrl); // Logs the URL of each request
  logStream.write(logEntry + '\n');
  next();
});


// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));


// session
app.use(express.urlencoded({ extended: false }))
const secret = process.argv[2];
app.use(
  session({
    secret: `${secret}`,
    cookie: {
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false
  })
)


//set cross site
app.use(
  cors({
    credentials: true,
    origin: [CLIENT_URL,"http://100.0.195.180:3000"],
    })
);

app.use(express.json());

const questionController = require("./controller/question");
const tagController = require("./controller/tag");
const answerController = require("./controller/answer");
const userController = require("./controller/user");
const voteController = require("./controller/vote");

app.use("/question", questionController);
app.use("/tag", tagController);
app.use("/answer", answerController);
app.use("/user",userController)
app.use("/vote",voteController);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  const logEntry = `[${new Date().toISOString()}] Error: ${err.message}`;
  logStream.write(logEntry + '\n');
  res.status(500).send('Something went wrong!');
});

let server = app.listen(port, () => {
    console.log(`Server starts at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    server.close();
    mongoose.disconnect();
    console.log("Server closed. Database instance disconnected");
    process.exit(0);
});

module.exports = server
