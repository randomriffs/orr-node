module.exports.tweet = () => {
    const axios = require('axios');
    const uid = require('uid')
    const Twit = require('twit');
    const config = require('../config/typewriterNews');
    var TinyURL = require('tinyurl');
    const Twitter = new Twit(config);
    let SourceUrl = "https://newsapi.org/v2/sources?apiKey="+process.env.NEWAPI_KEY;
    let newsUrl = "https://newsapi.org/v2/top-headlines?apiKey="+process.env.NEWAPI_KEY;
    let tweet = {
        status: '*******'
    }
console.log('calling source url')
    axios.get(SourceUrl)
        .then(function (response) {
            console.log('source url call completed')
            let responseData = response.data
            let sourcesLength = responseData.sources && responseData.sources.length-1;
            let randomSource = Math.floor(Math.random() * (sourcesLength - 0) + 0);
            let randomCategory = responseData.sources[randomSource].category
            let apiUrl = newsUrl+"&q="+randomCategory
            console.log('calling article api ',apiUrl)
            axios.get(apiUrl).then(function(newsResponse){
                console.log('article api sucessfull')
                let newsData = newsResponse.data;
                let articleLength = newsData.articles.length;
                let randomrArticle = Math.floor(Math.random() * (articleLength - 0) + 0);
                let articleTitle = newsData.articles[randomrArticle].title;
                let articleUrl = newsData.articles[randomrArticle].url;
                // const tinyUrlData = { 'url': articleUrl}

                TinyURL.shorten(articleUrl).then(function (shortenUrl) {
                    // console.log('tinyurl',res)
                    tweet.status = `${articleTitle} ${shortenUrl}`
                    console.log('tweet',tweet)
                    Twitter.post('statuses/update', tweet, tweeted)
                    function tweeted(err, firstData, response) {
                       if (err) {
                           console.log("Something went wrong!", err);
                       }
                       else {
                           console.log('News tweeted')
                       }
                   }
                }, function (err) {
                    console.log(err)
                })

            }).catch(err=>{
                console.log('error in article call')
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}