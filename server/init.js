// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so)
const { MONGO_URL } = require("./config");

let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let User = require('./models/users')
let Vote = require('./models/votes')



let mongoose = require('mongoose');

mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function voteCreate(question, user, value) {
  let vote = new Vote(
    {
      question: question,
      user: user,
      value: value
    }
  )
  return vote.save();
}

function userCreate(username, password, save_lists, subscribes) {
  let user = new User(
    {
      username: username,
      password: password,
      reg_date: new Date('2023-03-22T21:17:53'),
      save_lists: save_lists,
      subscribes: subscribes
    }
  )
  return user.save();
}

function tagCreate(name) {
  let tag = new Tag({ name: name });
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time) {
  let answerdetail = { text: text };
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;

  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers, asked_by, ask_date_time, views) {
  let qstndetail = {
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by
  }
  if (answers != false) qstndetail.answers = answers;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;

  let qstn = new Question(qstndetail);
  return qstn.save();
}

const populate = async () => {

  let t1 = await tagCreate('react');
  let t2 = await tagCreate('javascript');
  let t3 = await tagCreate('android-studio');
  let t4 = await tagCreate('shared-preferences');
  let t5 = await tagCreate('storage');
  let t6 = await tagCreate('website');
  let t7 = await tagCreate('Flutter');
  let t8 = await tagCreate('node.js');
  let t9 = await tagCreate('express');
  let t10 = await tagCreate('sql');
  let t11 = await tagCreate('nosql');
  let t12 = await tagCreate('database');
  let t13 = await tagCreate('rest-api');

  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'hamkalo', new Date('2023-11-20T03:24:42'));
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'azad', new Date('2023-11-23T08:24:00'));
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'abaya', new Date('2023-11-18T09:24:00'));
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'alia', new Date('2023-11-12T03:30:00'));
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 'sana', new Date('2023-11-01T15:24:19'));
  let a6 = await answerCreate('Storing content as BLOBs in databases.', 'abhi3241', new Date('2023-02-19T18:20:59'));
  let a7 = await answerCreate('Using GridFS to chunk and store content.', 'mackson3332', new Date('2023-02-22T17:19:00'));
  let a8 = await answerCreate('Store data in a SQLLite database.', 'ihba001', new Date('2023-03-22T21:17:53'));
  let a9 = await answerCreate('You can use Express.js middleware for custom error handling and route protection.', 'nodeExpert', new Date('2023-07-15T10:00:00'));
  let a10 = await answerCreate('Express provides a robust set of HTTP utility methods and middleware for building REST APIs.', 'apiMaster', new Date('2023-07-16T12:30:00'));
  let a11 = await answerCreate('Use SQL joins to combine data from multiple tables effectively.', 'sqlGuru', new Date('2023-08-10T14:20:00'));
  let a12 = await answerCreate('For NoSQL databases like MongoDB, consider indexing to improve query performance.', 'mongoNinja', new Date('2023-09-01T09:00:00'));
  let a13 = await answerCreate('When building scalable REST APIs, keep controllers clean and move logic to services.', 'restDev', new Date('2023-11-05T11:15:00'));

  let q1 = await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], [a1, a2], 'Joji John', new Date('2022-01-20T03:00:00'), 10);
  let q2 = await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t3, t4, t2], [a3, a4, a5], 'saltyPeter', new Date('2023-01-10T11:24:30'), 121);
  let q3 = await questionCreate('Object storage for a web application', 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.', [t5, t6], [a6, a7], 'monkeyABC', new Date('2023-02-18T01:02:15'), 200);
  let q4 = await questionCreate('Quick question about storage on android', 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains', [t3, t4, t5], [a8], 'elephantCDE', new Date('2023-03-10T14:28:01'), 103);
  let q5 = await questionCreate(
    'How to implement middleware in Express.js?',
    'I want to understand the concept of middleware in Express.js and how it can be used for authentication and logging. Are there best practices to follow?',
    [t8, t9, t13],
    [a9, a10],
    'expressLearner',
    new Date('2023-07-12T08:30:00'),
    25
  );

  let q6 = await questionCreate(
    'SQL joins for multiple tables',
    'What is the best way to join three or more tables in SQL while ensuring query efficiency? Are there scenarios where subqueries are better?',
    [t10, t12],
    [a11],
    'sqlNewbie',
    new Date('2023-08-10T13:00:00'),
    47
  );

  let q7 = await questionCreate(
    'How to optimize MongoDB queries?',
    'I am facing performance issues when querying a MongoDB collection with over 10 million documents. What are the best practices for optimizing queries?',
    [t11, t12],
    [a12],
    'nosqlDeveloper',
    new Date('2023-09-01T08:45:00'),
    99
  );

  let q8 = await questionCreate(
    'Best practices for REST API design',
    'What are the key principles and best practices for designing REST APIs? How can I make sure they are scalable and maintainable?',
    [t8, t9, t13],
    [a13],
    'apiEnthusiast',
    new Date('2023-11-01T10:30:00'),
    300
  );

  let ql1 = {
    name: 'Qlist1',
    questions: [q1, q2]
  }
  let ql2 = {
    name: 'Qlist2',
    questions: [q1, q2, q4, q3]
  }
  let ql3 = {
    name: 'Qlist3',
  }
  let ql4 = {
    name: 'Qlist4',
    questions: [q5, q6]
  };
  let ql5 = {
    name: 'Qlist5',
    questions: [q7, q8]
  };

  let u1 = await userCreate('sc971008', 'wssc19971008', [ql1, ql2], [q1, q2, q4])
  let u2 = await userCreate('sc123456', 'wssc54321008', [ql2, ql3], [q3, q2])
  let u3 = await userCreate('dbLover', 'password123', [ql4], [q5, q6]);
  let u4 = await userCreate('apiWizard', 'restful2023', [ql5], [q7, q8]);

  let v1 = await voteCreate(q1, 'sc971008', 1);
  let v2 = await voteCreate(q2, 'sc123456', -1);
  let v3 = await voteCreate(q5, 'dbLover', 1);
  let v4 = await voteCreate(q7, 'apiWizard', 1);
  let v5 = await voteCreate(q6, 'dbLover', -1);
  let v6 = await voteCreate(q8, 'apiWizard', 1);

  if (db) db.close();
  console.log('done');
}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if (db) db.close();
  });

console.log('processing ...');





