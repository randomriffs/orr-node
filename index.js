const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = new express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3002;
var router = express.Router();
var router= require('./router/index');
app.use('/', router);


// gypsyAxiom
var gypsyAxiom = require('./firestore/gypsyAxiom')
gypsyAxiom.tweet();

// book logs
var bookLogs=require('./firestore/bookLogs')
bookLogs.tweet();

// add words to gypsyAxiom
// var addWordsToGypsy= require('./modules/addDataGypsyaxiom')
// addWordsToGypsy.addWords();

app.listen(port, () => {
    console.log('server is running up')
})
