var admin = require("firebase-admin");
var wordsServiceAccount = require("../config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
var bookListServiceAccount = require('../config/booklist-7b5b5-firebase-adminsdk-qqyuy-5e10a2db35.json')
var webPageserviceAccount = require("../config/siteurls-58c30-firebase-adminsdk-4woth-fb1c2ac4d6");

var scriptInit = admin.initializeApp({
        credential: admin.credential.cert(wordsServiceAccount),
        databaseURL: "https://words-movies.firebaseio.com"
    },'script');

var bookLogsInit = admin.initializeApp({
        credential: admin.credential.cert(bookListServiceAccount),
        databaseURL: "https://booklist-7b5b5.firebaseio.com"
    },'bookLogs');

var webPageInit = admin.initializeApp({
        credential: admin.credential.cert(webPageserviceAccount),
        databaseURL: "https://siteurls-58c30.firebaseio.com"
    },'webPage');


module.exports.script = scriptInit
module.exports.bookLogs=bookLogsInit
module.exports.webPage=webPageInit