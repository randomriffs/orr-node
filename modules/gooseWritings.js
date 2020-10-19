module.exports.goose = () => {
    const axios = require('axios');
    const uid = require('uid')
    const Twit = require('twit');
    const config = require('../config/gooseWritings');
    const Twitter = new Twit(config);
    let url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions%7Cimages&rvprop=content&prop=extracts&exintro&explaintext&grnlimit=1";
    let tweetedStatus = ""
    let tweet = {
        status: 'goose writings'
    }
    let wikiDesc = ""
    let previousReplyId = ""
    axios.get(url)
        .then(async function (response) {
            tweetedStatus = response.data.query.pages[Object.keys(response.data.query.pages)[0]].title.replace(/ *\([^)]*\) */g, "");
            wikiDesc = response.data.query.pages[Object.keys(response.data.query.pages)[0]].extract;
            tweet.status = tweetedStatus;
            Twitter.post('statuses/update', tweet, tweeted)
             function tweeted(err, firstData, response) {
                if (err) {
                    console.log("Something went wrong!", err);
                }
                else {
                    console.log("Voila It worked!");
                    previousReplyId = firstData.id_str;
                    let twoForty =  wikiDesc.match(/.{1,240}(\s|$)/g)
                    twoForty.push(`https://en.wikipedia.org/wiki/${encodeURIComponent(tweetedStatus.trim())}`)
                    for (let i = 0, p = Promise.resolve(); i < twoForty.length; i++) {
                        p = p.then(_ => new Promise(resolve =>{
                            tweet.status = twoForty[i];
                            tweet.in_reply_to_status_id = previousReplyId
                            console.log(previousReplyId)
                            console.log(tweet.status)
    
                            Twitter.post('statuses/update', tweet, (err, thridData, response) => {
                                if (err) {
                                    console.log("Something went wrong!", err);
                                } else {
                                    previousReplyId=""
                                    previousReplyId = thridData.id_str;
                                    console.log("thridData")
                                    resolve()
                                }
                            })
                        }
                        ));
                    }
                }
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}