module.exports.crawl= () => {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const uid = require('uid')
    let page = 1;
    const mainurl = "https://www.tumblr.com/explore/audio";
    
    var admin = require("firebase-admin");
    
    var serviceAccount = require("../config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
    
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://words-movies.firebaseio.com"
    });
    
    let db = admin.firestore();
    
    async function crawl(url) {
        fetchData(url).then((res) => {
            const html = res.data;
            const $ = cheerio.load(html);
            // console.log('$', $('.quotes').children())
            // let quotesCls = $('.quotes');
            // console.log('$', $)
           console.log('asd', $) 
           debugger
           $('iframe').each(function(index, element) {
               debugger
            var url = $(element).attr('src'); // --> Get the URL of the iframe
         console.log('object')
            // Do something with the URL of the iframe here
        });
            // .map((i,audios)=>{
            //    let aud= $(audios).find('section').attr('class');
            //    console.log('writing the quote seperately ',aud)
            // //    console.log(quote.replace(/^\s+|\s+$/g, '').replace(/\n/g, '').replace(/\s/g, ' '))
            // //    quotesArr.push(quote.replace(/^\s+|\s+$/g, '').replace(/\n/g, '').replace(/\s/g, ' ').replace(/\s\s+/g, ' '))
    
            // })
            // let dbQuote = quotesArr.filter(item => item)
            // console.log('dbQuote', dbQuote)
            // db.collection("fyodor").doc(`page-${page}`).set({
            //     data: dbQuote
            // }, { merge: true }).then(() => {
            //     console.log('data saved')
            //     page = page + 1
            //         crawl(mainurl + page)
            // }).catch((err) => console.log(err))

        })
    
    }
    
    crawl(mainurl)
        async function fetchData(url) {
        console.log("Crawling data...", url)
        // make http call to url
        let response = await axios(url).catch((err) => console.log(err));
    
        if (response.status !== 200) {
            console.log("Error occurred while fetching data");
            return;
        }
        return response;
    }
    }