module.exports.tweet = () => {
    const config = require('../config/uxSlashUi');
    const Twitter = require("twitter")
    const client = new Twitter(config)
    const download = require('image-downloader')
    const fs = require("fs");
    const axios = require('axios');
    const path = require('path');
    // const captureWebsite = require('capture-website');
    // const puppeteer = require('puppeteer');

    let webpageUrl = 'https://randomriffs.herokuapp.com/api/random/webpage';
    const directory = 'modules/screenshot'

    tweetUxSlashUi = () =>{
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
            axios.get(webpageUrl)
                .then(function (response) {
                    let webPageData = response.data.dataList.data;
                    let webPageDataSize = webPageData.length;
                    let randomWebPageIndex = Math.floor(Math.random() * webPageDataSize);
                    let randomWebPageData = webPageData[randomWebPageIndex]
                    console.log('webpagedata',randomWebPageData)
                    let randomWebPageUrl = randomWebPageData.siteUrl;
                    const tweetShot = () => {
                                setTimeout(()=>{
                                    const imageData = fs.readFileSync("modules/screenshot/screenshot.png") //replace with the path to your image
                                    client.post("media/upload", { media: imageData }, function (error, media, response) {
                                        if (error) {
                                            console.log(error)
                                            tweetUxSlashUi();
                                        } else {
                                            const status = {
                                                status: randomWebPageUrl,
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
                    }

                    // (async () => {
                    //     await captureWebsite.file(randomWebPageUrl, 'modules/screenshot/screenshot.png');
                    //     tweetShot()
                    // })();
                    // (async () => {
                    //     const browser = await puppeteer.launch({
                    //         args: [
                    //             '--no-sandbox',
                    //             '--disable-setuid-sandbox'
                    //         ],
                    //     });
                    //     const page = await browser.newPage();
                    //     await page.goto(randomWebPageUrl);
                    //     await page.screenshot({path: 'modules/screenshot/screenshot.png'});
                    //     await browser.close();
                    //     tweetShot();
                    //   })();
                }).catch(err => {
                    // tweetUxSlashUi()
                    console.log('axios error',err)
                });
        });
    }
    tweetUxSlashUi()
}

