module.exports.scrapDrib = () => {
const axios = require('axios');
const cheerio = require('cheerio');
const uid = require('uid')
let page = 1;
let urlCount = 0
let mainurl = "https://dribbble.com/shots/popular/animation?page=";

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
        const arr = []
        const olElem = $('.shots-grid').children()
        olElem.each((i, li) => {
            liElement = $(li).find('.dribbble > .dribbble-shot > .dribbble-img > .dribbble-link').attr('href')
            arr.push(liElement)
        })
        let dribbleFirst = []
        let dribbleSecond = []
        dribbleFirst = arr.slice(1, arr.length - 1);
        dribbleFirst.forEach(async (url, i) => {
            let secUrl = `https://dribbble.com${url}`
            await axios(secUrl).then((res) => {
                const html = res.data;
                const $ = cheerio.load(html);
                let video = $('section').find('.shot-media-container > .media-shot > .media-content > .video-wrap > video').attr('data-src')
                dribbleSecond.push(video)
            }).catch((err) => console.log(err));
            dribbleSecond = dribbleSecond.filter((data) => data !== undefined)
        })

        setTimeout(() => {
            console.log('dribbleSecond', dribbleSecond)
            db.collection("dribb").doc(uid(16)).set({
                data: dribbleSecond
            }, { merge: true }).then(() => {
                console.log('data saved')
                page = page + 1
                if (page < 51 ) {
                    crawl(mainurl + page)
                } else {
                    page = 1
                }
            }).catch((err) => console.log(err))
        }, 10000)
    })
}
crawl(mainurl+ page)

async function fetchData(url) {
    console.log("Crawling data...", url)
    let response = await axios(url).catch((err) => console.log(err));
    return response;
}
}