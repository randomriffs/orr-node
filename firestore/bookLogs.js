module.exports.tweet = () => {
    var bookLogsModule = require('./db')
    var db = bookLogsModule.bookLogs.firestore();
    const Twit = require('twit');
    const config = require('../config/bookLogs');
    const Twitter = new Twit(config);

    bookLogging = () => {
        let tweet = {
            status: 'test'
        }
        let bookSize = 515;
        let randomBookList = Math.floor(Math.random() * bookSize);
        console.log('randomBookList', randomBookList)
        var docRef = db.collection("bookList").doc("page-" + randomBookList);
        docRef.get().then(function (doc) {
            if (doc.exists) {
                let books = doc.data().list;
                let booksLength = books.length - 1;
                let randomBook = Math.floor(Math.random() * booksLength) + 1
                let book = books[randomBook];
                console.log('book', book)
                tweet.status = `${book.bookName} - ${book.author}
                
                ${book.bookUrl}`
                Twitter.post('statuses/update', tweet, tweeted)
                function tweeted(err, data, response) {
                    if (err) {
                        console.log("Something went wrong!", err);
                    }
                    else {
                        console.log("Voila It worked!");
                    }
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                // res.json({ status: false })
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }
    bookLogging();
    setInterval(bookLogging, 1000 * 1980);
}

