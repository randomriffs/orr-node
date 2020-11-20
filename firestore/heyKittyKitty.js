module.exports.tweet = () => {
    const config = require('../config/heyKittyKitty');
    const Twitter = require("twitter")
    const client = new Twitter(config)
    const download = require('image-downloader')
    const fs = require("fs");
    const axios = require('axios');
    const path = require('path');

    let catApiUrl = 'https://api.thecatapi.com/v1/images/search?limit=1&format=gif&api_key='+process.env.THE_CAT_API;
    const directory = 'firestore/media'

    tweetCat = () =>{
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            // removing file
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                    console.log('file removed')
                });
            }
            // removed file
            axios.get(catApiUrl)
                .then(function (response) {
                    let catData = response.data;
                    let catImage = '';
                    let catImageFormat = 'jpg'
    
                    if (catData && catData.length > 0) {
                        // console.log('cat data',catData[0].url)
                        catImage = catData[0].url;
                        let catImageFormatSplit = catImage.split('.');
                        catImageFormat = catImageFormatSplit[catImageFormatSplit.length - 1];
                    }
                    const options = {
                        url: catImage,
                        dest: 'firestore/media/image.' + catImageFormat                // will be saved to /path/to/dest/image.jpg
                    }
                    const tweetPngJpg = () => {
                        download.image(options)
                            .then(({ filename }) => {
                                console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
    
                                setTimeout(()=>{
                                    const imageData = fs.readFileSync("firestore/media/image.jpg") //replace with the path to your image
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
                                },5000)
                            })
                            .catch((err) => console.error(err))
                    }
    
                    if (catImageFormat.toLocaleLowerCase() === 'jpg' || catImageFormat.toLocaleLowerCase() === 'png') {
                        tweetPngJpg()
                    } else if(catImageFormat.toLocaleLowerCase() === 'gif'){
                        tweetCat()
                    }
    
                }).catch(err => {
                    tweetCat()
                    console.log(err)
                });
        });
    }
    tweetCat()
}

