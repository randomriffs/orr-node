module.exports.goose = () => {
    const axios = require('axios');
    const uid = require('uid')
    const Twit = require('twit');
    const config = require('../config/gooseWritings');
    const Twitter = new Twit(config);
    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=content&grnlimit=1";
    let tweetedStatus = ""
    let tweet = {
        status: 'goose writings'
    }
    axios.get(url)
        .then(function (response) {
            tweetedStatus = response.data.query.pages[Object.keys(response.data.query.pages)[0]].title.replace(/ *\([^)]*\) */g, "");
            tweet.status = tweetedStatus;
            Twitter.post('statuses/update', tweet, tweeted)
            function tweeted(err, data, response) {
                if (err) {
                    console.log("Something went wrong!", err);
                }
                else {

                    console.log("Voila It worked!");
                    tweet.status = `https://en.wikipedia.org/wiki/${encodeURIComponent(tweetedStatus.trim())}`
                    tweet.in_reply_to_status_id = data.id_str
                    Twitter.post('statuses/update', tweet, (err, data, response)=>{
                        if (err) {
                            console.log("Something went wrong!", err);
                        } else {
                            console.log("Posted link to tweet")
                        }
                    })
                }
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}