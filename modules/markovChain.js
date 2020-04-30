module.exports.markovChain = () => {
    var fs = require('fs');
    var admin = require("firebase-admin");
    var serviceAccount = require("../config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://words-movies.firebaseio.com"
    });
    let db = admin.firestore();
    let rita = require('rita');
    let rm = rita.RiMarkov(10);
    rm.loadFrom("modules/data.txt", () => {
        console.log('rm.generateSentences(3333);', rm.generateSentences(3))
        db.collection("verses").doc('the-odyssey-7').set({
            data: rm.generateSentences(3000)
        }, { merge: true }).then(() => {
            console.log('data saved')
        }).catch((err) => console.log(err))
    });
}
