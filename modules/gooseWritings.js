module.exports.goose = () => {
    const axios = require('axios');
    const uid = require('uid')
    const Twit = require('twit');
    const config = require('../config/gooseWritings');
    const Twitter = new Twit(config);
    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=content&grnlimit=1";

    // goose = () => {
        let tweet = {
            status: 'goose writings'
        }
        // docRef.get().then(function (doc) {
            // if (doc.exists) {
                // let verses = doc.data().data;
                // let versesSize = verses.length - 1;
                // let randomVerses = Math.floor(Math.random() * versesSize);
                // console.log('random verses', randomVerses)
                // console.log(verses[randomVerses])
                // if(verses[randomVerses].length > 33){
        axios.get(url)
            .then(function (response) {
                // handle success
                tweet.status = response.data.query.pages[Object.keys(response.data.query.pages)[0]].title.replace(/ *\([^)]*\) */g, "");
                // tweet.status = verses[randomVerses].replace(/[0-9]/g,'');
                Twitter.post('statuses/update', tweet, tweeted)
                function tweeted(err, data, response) {
                    if (err) {
                        console.log("Something went wrong!", err);
                    }
                    else {
                        console.log("Voila It worked!");
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })



                // }

            // } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            //     // res.json({ status: false })
            // }
        // }).catch(function (error) {
        //     console.log("Error getting document:", error);
        // });
    // }


}