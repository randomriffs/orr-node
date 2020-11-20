module.exports.tweet = () => {
    const config = require('../config/sameTypewriter');
    const Twitter = require("twitter")
    const client = new Twitter(config)
    const fs = require("fs");

    tweetSameTypewriter = () =>{

        const imageData = fs.readFileSync("modules/media/bro.jpg")
        client.post("media/upload", { media: imageData }, function (error, media, response) {
            if (error) {
                console.log(error)
            } else {
                const status = {
                    status: "",
                    media_ids: media.media_id_string
                }

                client.post("statuses/update", status, function (error, tweet, response) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("Successfully tweeted an image!")
                    }
                })
            }
        })
    }
    tweetSameTypewriter()
}

