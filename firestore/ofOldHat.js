module.exports.tweet = () => {
    var ofOldModule = require('./db')
    var db = ofOldModule.gypsy.firestore()
    const Twit = require('twit');
    const config = require('../config/ofOldHat');
    const Twitter = new Twit(config);

    ofOldHat = () => {
        let tweet = {
            status: 'test'
        }
        let homerLength = 5;
        let randomHomer = Math.floor(Math.random() * homerLength) + 1
        console.log('randomHome', randomHomer)
        var docRef = db.collection("verses").doc("homer-" + randomHomer);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let verses = doc.data().data;
                let versesSize = verses.length - 1;
                let randomVerses = Math.floor(Math.random() * versesSize);
                console.log('random verses', randomVerses)
                console.log(verses[randomVerses])
                tweet.status = verses[randomVerses].toLowerCase();
                Twitter.post('statuses/update', tweet, tweeted)
                function tweeted(err, data, response) {
                    if (err) {
                        console.log("Something went wrong!", err);
                    }
                    else {
                        console.log("Voila It worked!");
                    }
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // res.json({ status: false })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    ofOldHat();
    setInterval(ofOldHat, 1000 * 1980);
}

