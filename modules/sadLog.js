module.exports.logSad = () => {
    const Twit = require('twit');
    // const config = require('../config/sadLog');
    const Twitter = new Twit(config);
    let tweetCount = 0;
    let previousTweetId = '1317512390099922945'

    // logTweet = () => {

    //     }

    // }
    // ofOldHat();

    function logTweet() {
        tweetCount++
        var min = 3600,
          max = 7200;
        var rand = Math.floor(Math.random() * (max - min + 1) + min); //Generate Random number between 5 - 10
        // alert('Wait for ' + rand + ' seconds');
       
        let tweet = {
            status: `:(    #${tweetCount}`,
            in_reply_to_status_id: previousTweetId
        }
        
        // if(verses[randomVerses].length > 33){
        //     tweet.status = verses[randomVerses].replace(/[0-9]/g,'');
            Twitter.post('statuses/update', tweet, tweeted)
            
            function tweeted(err, data, response) {
                if (err) {
                    console.log("Something went wrong!", err);
                }
                else {
                    previousTweetId =  data.id_str
                    console.log("Voila It worked!",data);
                }
            }
        setTimeout(logTweet, rand * 1000);
      }
      
      logTweet()

    // setInterval(logTweet, 10000);
}

