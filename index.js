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
var cron = require('node-cron');


// scriptEcho 
var scriptEcho = require('./firestore/scriptEcho')
scriptEcho.tweet();

// of Old Had
var ofOldHat=require('./firestore/ofOldHat')
ofOldHat.tweet();

var scrapDribb = require('./modules/dribb');
cron.schedule('0 */24 * * *', () => {
    scrapDribb.scrapDrib()
});
// add words to scriptEcho 
// var addWordsToScript= require('./modules/addDataScriptEcho')
// addWordsToScript.addWords();

// add verses to ofOldHat
// var versesOfOldHat = require('./modules/markovChain');
// versesOfOldHat.markovChain();

// var sendMail = require('./modules/sendMail');
// sendMail.sendMail()

app.listen(port, () => {
    console.log('server is running up')
})
