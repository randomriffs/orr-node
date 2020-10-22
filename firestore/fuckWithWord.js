module.exports.tweet = () => {
    var ofOldModule = require('./db')
    var db = ofOldModule.script.firestore()
    const Twit = require('twit');
    const config = require('../config/fuckWithWord');
    const Twitter = new Twit(config);

    withWord = () => {
        let tweet = {
            status: 'fuck word'
        }
        let books = ['1984', 'catcher-in-the-rye', 'fahrenheit-451', 'grapes-of-wrath', 'of-mice-and-men', 'orlando',
            'the-brother-karamazov', 'the-illiad', 'the-odyssey']
        const getFuckWord = (verses) =>{
            let versesSize = verses.length - 1;
            let randomVerses = Math.floor(Math.random() * versesSize);
            // console.log('random verses', randomVerses)
            
            console.log('random verses', verses[randomVerses])
            let randomFuck = Math.floor(Math.random() * verses[randomVerses].split(' ').length-2);
            console.log('random verses', verses[randomVerses].split(' '))
            let fuckWord = verses[randomVerses].split(' ')[randomFuck].replace(/[^a-zA-Z0-9]/g,'');
            return `Fuck ${fuckWord.charAt(0).toUpperCase() + fuckWord.slice(1)}`
        }
            // other book list []
        let bookLength = books.length;
        console.log('bookLength', bookLength)
        let randomBook =books[Math.floor(Math.random() * bookLength)]
        // let document = randomBook+
        let randomSubBook = Math.floor(Math.random()*7)+1;

        console.log('randomHome', randomBook+'-'+randomSubBook);
        var docRef = db.collection("verses").doc(randomBook+'-'+randomSubBook);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let fuckWord = getFuckWord(doc.data().data);
                // if(fuckWord.length>=12){
                    tweet.status = fuckWord;
                    console.log(fuckWord)
                    Twitter.post('statuses/update', tweet, tweeted)
                    function tweeted(err, data, response) {
                        if (err) {
                            console.log("Something went wrong!", err);
                        }
                        else {
                            console.log("Voila It worked!");
                        }
                    }
                // } else {
                //     console.log('no fuck word')
                // }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // res.json({ status: false })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    // ofOldHat();
    withWord();
    // setInterval(ofOldHat, 1000 * 1980);
}

