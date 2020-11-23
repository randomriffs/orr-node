module.exports.scrapDrib = () => {
const axios = require('axios');
const cheerio = require('cheerio');
// const uid = require('uid')
let page = 302;
let urlCount = 0
let mainurl = "https://www.awwwards.com/websites/honorable/?page=";

var admin = require("firebase-admin");

var serviceAccount = require("../config/siteurls-58c30-firebase-adminsdk-4woth-fb1c2ac4d6");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://siteurls-58c30.firebaseio.com"
  });

let db = admin.firestore();

async function crawl(url) {
    fetchData(url).then((res) => {
        const html = res.data;
        const $ = cheerio.load(html);
        const arr = [] 
        // console.log('dollar')
        const ulElem = $('.list-items').children()
        // const olElem = $('.shots-grid').children()
        // liElement = $(li).find('.box-item > .rollover > .dribbble-img > .dribbble-link').attr('href')
        ulElem.each((i, li) => {
            liElement = $(li).find('.box-item > .rollover').children()
            let srcset = $(liElement[0]).find('.box-photo').children().attr('data-srcset')
            // arr.push(liElement)
            eachSite = {}
            let splitUrl = srcset.split(',');
            let pureUrl = []
            splitUrl.forEach(eachUrl=>{
                pureUrl.push(eachUrl.substring(0, eachUrl.length-3).trim())
            })
            eachSite.imageUrl = pureUrl

            // liElement.each((i, div)=>{
                divElement = $(liElement[3]).children().attr('href')
                eachSite.siteUrl = divElement;
            // })
            
            arr.push(eachSite)
            // console.log('eachSite',arr)
        })
        // let dribbleFirst = []
        // let dribbleSecond = []
        // dribbleFirst = arr.slice(1, arr.length - 1);
        // dribbleFirst.forEach(async (url, i) => {
        //     let secUrl = `https://dribbble.com${url}`
        //     await axios(secUrl).then((res) => {
        //         const html = res.data;
        //         const $ = cheerio.load(html);
        //         let video = $('section').find('.shot-media-container > .media-shot > .media-content > .video-wrap > video').attr('data-src')
        //         dribbleSecond.push(video)
        //     }).catch((err) => console.log(err));
        //     dribbleSecond = dribbleSecond.filter((data) => data !== undefined)
        // })

        setTimeout(() => {
            if(arr && arr.length > 0){
                db.collection("honorable").doc(`page-${page}`).set({
                    data: arr
                }, { merge: true }).then(() => {
                    console.log('data saved')
                    page = page + 1
                    if (page <= 312 ) {
                        crawl(mainurl + page)
                    } 
                }).catch((err) => console.log(err))
            } else {
                page = page + 1
                if (page <= 312 ) {
                    crawl(mainurl + page)
                } 
            }
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