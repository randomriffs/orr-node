var admin = require("firebase-admin");
var wordsServiceAccount = require("../config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
var bookListServiceAccount = require('../config/booklist-7b5b5-firebase-adminsdk-qqyuy-5e10a2db35.json')

var scriptInit = admin.initializeApp({
        credential: admin.credential.cert(wordsServiceAccount),
        databaseURL: "https://words-movies.firebaseio.com"
    },'script');

var bookLogsInit = admin.initializeApp({
        credential: admin.credential.cert(bookListServiceAccount),
        databaseURL: "https://booklist-7b5b5.firebaseio.com"
    },'bookLogs');

module.exports.script = scriptInit
module.exports.bookLogs=bookLogsInit