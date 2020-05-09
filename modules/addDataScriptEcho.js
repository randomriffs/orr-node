module.exports.addWords = () => {
    var fs = require('fs');
    var admin = require("firebase-admin");
    var serviceAccount = require("../config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://words-movies.firebaseio.com"
    });
    let db = admin.firestore();

    let filmList = ['dunkirk', 'forrest-gump', 'moonlight', 'no-country-for-old-men', 'pulp-fiction', 'spotlight', 'blood-diamond'
        , 'django-unchained', 'fight-club', 'inglourious-basterds', 'cuckoo-nest', 'reservoir-dogs', 'monte-cristo', 'godfather'
        , 'grand-budapest', 'godfather-2', 'catch-22', 'catch-me-if-you-can', 'hacksaw-ridge', 'inception', 'into-the-wild', '1984'
        , 'rango', 'the-grapes-of-wrath', 'to-kill-a-mokingbird', 'whiplash', 'amelie', 'coffee-and-cigarettes', 'the-misfortunates'
        , 'the-white-balloon', 'bullitt','earth', 'the-magnificent-seven', 'tony-manero']


    fs.readFile('./subtitlefiles/Tony Manero.srt', 'utf8', function (err, data) {
        if (err) throw err;
        let arrowSplitData = data.split('-->')
        let dataRemovedData = arrowSplitData.filter(data => data !== 'data');
        let dialogue = []
        dataRemovedData.forEach((data) => {
            let onlyDialogue = data.replace(/[^A-Za-z, .?!']+/g, ' ');
            let removedComma = onlyDialogue.slice(4, onlyDialogue.length - 4);
            if (removedComma[0] === 'i') {
            } else {
                dialogue.push(removedComma.replace(/^\s+/g, ''));
            }
        })
        let removeFirstAndLast = dialogue.slice(10, dialogue.length - 10)
        console.log('removeFirstAndLast', removeFirstAndLast)

        // db.collection("words").doc('tony-manero').set({
        //     data: removeFirstAndLast
        // }, { merge: true }).then(() => {
        //     console.log('data saved')
        // }).catch((err) => console.log(err))
    });
}