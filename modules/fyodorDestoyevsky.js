module.exports.crawl= () => {
const axios = require('axios');
const cheerio = require('cheerio');
const uid = require('uid')
let page = 1;
const mainurl = "https://www.goodreads.com/author/quotes/3137322.Fyodor_Dostoyevsky?page=";

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
        let quotesArr = []
        $('.quotes').children().map((i,quotes)=>{
           let quote = $(quotes).find('.quote > .quoteDetails > .quoteText').text();
        //    console.log('writing the quote seperately ')
        //    console.log(quote.replace(/^\s+|\s+$/g, '').replace(/\n/g, '').replace(/\s/g, ' '))
           quotesArr.push(quote.replace(/^\s+|\s+$/g, '').replace(/\n/g, '').replace(/\s/g, ' ').replace(/\s\s+/g, ' '))

        })
        let dbQuote = quotesArr.filter(item => item)
        console.log('dbQuote', dbQuote)
        db.collection("fyodor").doc(`page-${page}`).set({
            data: dbQuote
        }, { merge: true }).then(() => {
            console.log('data saved')
            page = page + 1
                crawl(mainurl + page)
        }).catch((err) => console.log(err))

            // console.log('dribbleSecond', filterUndefiend)
            // var docRef = db.collection("animation").doc("page-1");
            // docRef.get().then(function(doc) {   
            //     if (doc.exists) {
            //         let data = doc.data();

            //         console.log("Document data:", data.list.length);
            //     } else {
            //         // doc.data() will be undefined in this case
            //         console.log("No such document!");
            //     }
            // }).catch(function(error) {
            //     console.log("Error getting document:", error);
            // });
  



        // $('#main').each((i, ol) => {
        // const children = $(ol).children();
        // children.each((i, li) => {
        // //   const children = $(li).children().find('a').attr('href');
        //   children.each((i, a) => {
        //     // arr.push($('.dribbble-link').attr('href'))
        //   })
        // })
        //   });



        // let secondUrl =  'https://dribbble.com'
        // if($('tbody').text()=)
        // const bookLists = $('tbody').children();
        // let bookListArray = [];
        // bookLists.each(function () {
        //     let eachBook = $(this).children();
        //     // console.log('eachBook',eachBook);

        //     eachBook.each(function () {
        //         let bookData = {}
        //         bookData.bookName = $(this).children().find('a > span').text();
        //         bookData.author = $(this).children().find('.authorName__container > .authorName > span').text();
        //         bookData.authorUrl = $(this).children().find('.authorName__container > .authorName').attr('href');
        //         bookData.bookUrl = "https://www.goodreads.com" + $(this).find('.bookTitle').attr('href');
        //         // console.log('asdf',$(this).children().find('a').attr('href'));
        //         if (bookData.bookName !== '') {
        //             bookListArray.push(bookData);
        //         }

        //     })

        // })




        // console.log(bookListArray)
        // console.log('quoteList', quoteList)
        // return bookListArray;
        // db.collection("bookList").doc('page-' + page).set({
        //     list: bookListArray
        // }, { merge: true }).then(() => {

        //     console.log('data saved')
        //     page = parseInt(page) + 1
        //     console.log('page', page)
        //     console.log('calling next page')
        //     crawl(mainurl + page)

        // })
        //     .catch((err) => console.log(err))


    })

}

crawl(mainurl + page)



// var docRef = db.collection("bookList").doc("page-1");

// docRef.get().then(function(doc) {
//     if (doc.exists) {
//         let data = doc.data();

//         console.log("Document data:", data.list.length);
//     } else {
//         // doc.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }).catch(function(error) {
//     console.log("Error getting document:", error);
// });




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