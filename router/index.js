var express = require('express');
const app = new express();
var router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const path = require('path');
var admin = require("firebase-admin");
const axios = require('axios');

let filmList = ['dunkirk', 'forrest-gump', 'moonlight', 'no-country-for-old-men', 'pulp-fiction', 'spotlight', 'blood-diamond'
    , 'django-unchained', 'fight-club', 'inglourious-basterds', 'reservoir-dogs', 'godfather'
    , 'grand-budapest', 'godfather-2', 'catch-me-if-you-can', 'hacksaw-ridge', 'inception', 'into-the-wild'
    , 'rango', 'whiplash', 'amelie', 'coffee-and-cigarettes', 'the-misfortunates', 'the-white-balloon'
    , 'bullitt', 'earth', 'the-magnificent-seven', 'tony-manero', 'portrait-of-a-lady-on-fire','taxi-driver','the-departed']

let books = ['1984', 'catcher-in-the-rye', 'fahrenheit-451', 'grapes-of-wrath', 'of-mice-and-men', 'orlando',
    'the-brother-karamazov', 'the-illiad', 'the-odyssey']

let webpageCollections = ['nominees', 'honorable', 'site-of-the-day']

var scriptModule = require('../firestore/db')
var db = scriptModule.script.firestore();

var bookLogModule = require('../firestore/db')
var bookLogDb = bookLogModule.bookLogs.firestore()

var webPageModule = require('../firestore/db')
var webPageDb = webPageModule.webPage.firestore()

const User = require('../models/userSchema')
const Blogs = require('../models/blogSchema');
const Tasks = require('../models/taskSchema');
const { default: Axios } = require('axios');
// app.use(express.static(path.join(__dirname, '../../build')));
// app.use(express.static("build"));
router.post('/api/login', (req, res) => {
    let userStatus = {}
    console.log('req.bodys', req.body)
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }).then((user) => {
        if (user) {
            res.json({ status: true, message: 'user exists' })
        } else {
            res.json({ status: false, message: 'user not exists' })
        }

    });

})
getAllBlogPost = (req, res) => {
    Blogs.find({
    }, (err, result) => {
        if (err) throw err;
        if (result) {
            res.json(result.reverse())
        } else {
            res.send(JSON.stringify({
                error: 'Error'
            }))
        }
    })
}
router.get('/api/blogs', (req, res) => {
    getAllBlogPost(req, res)
})

getAllTask = (req, res) => {
    Tasks.find({}, (err, result) => {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({ error: 'error' }))
        }
    })
}
router.get('/api/tasks', (req, res) => {
    getAllTask(req, res)
})

router.post('/api/add-post', (req, res) => {
    console.log('req.bodys', req.body)
    Blogs.create({
        title: req.body.title,
        content: req.body.content,
    }).then((data) => {
        if (data) {
            getAllBlogPost(req, res)
        }
    });
})

router.post('/api/add-task', (req, res) => {
    console.log('req.bodys', req.body)
    Tasks.create({
        task: req.body.task,
        isDone: req.body.isDone,
    }).then((data) => {
        if (data) {
            getAllTask(req, res)
        }
    });
})

router.get('/test', (req, res) => {
    res.json({ status: 'sucess' })
})

router.post('/api/delete-post', (req, res) => {
    console.log('resssssss', req.body)
    Blogs.deleteOne({ _id: req.body.id }).then((data) => {
        if (data) {
            getAllBlogPost(req, res)
        }
    })
})
router.post('/api/edit-post', (req, res) => {
    console.log('resssssss', req.body)
    Blogs.findOneAndUpdate({ "_id": Object(req.body.id) },
        {
            title: req.body.title,
            content: req.body.content
        }).then((data) => {
            if (data) {
                getAllBlogPost(req, res)
            }
        })
})
router.post('/api/delete-task', (req, res) => {
    console.log('resssssss', req.body)
    Tasks.deleteOne({ "_id": Object(req.body.id) }).then((data) => {
        if (data) {
            getAllTask(req, res)
        }
    })
})

router.get('/api/random', (req, res) => {
    let totalFilmList = filmList.length
    let randomFilm = Math.floor(Math.random() * totalFilmList)
    console.log(filmList[randomFilm])
    var docRef = db.collection("words").doc(filmList[randomFilm]);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            let sayings = doc.data().data;
            let totalSayings = sayings.length - 1;
            let randomSaying = Math.floor(Math.random() * totalSayings) + 1
            console.log('total sayings', sayings.length)
            console.log('random saying id', randomSaying)
            console.log(sayings[randomSaying])
            res.json({ status: true, sayings: sayings[randomSaying], film: filmList[randomFilm] })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            res.json({ status: false })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

})


router.get('/api/random/books', (req, res) => {
    let bookSize = 515;
    let randomBookList = Math.floor(Math.random() * bookSize);
    console.log('randomBookList', randomBookList)
    var docRef = bookLogDb.collection("bookList").doc("page-" + randomBookList);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            let books = doc.data().list;
            let booksLength = books.length - 1;
            let randomBook = Math.floor(Math.random() * booksLength) + 1
            let book = books[randomBook];
            console.log('book', book)
            res.json({ data: book })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // res.json({ status: false })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

})

router.get('/api/random/verses', (req, res) => {
    let bookLength = books.length;
    console.log('bookLength', bookLength)
    let randomBook = books[Math.floor(Math.random() * bookLength)]
    // let document = randomBook+
    let randomSubBook = Math.floor(Math.random() * 7) + 1;

    console.log('randomHome', randomBook + '-' + randomSubBook);
    var docRef = db.collection("verses").doc(randomBook + '-' + randomSubBook);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            let verses = doc.data().data;
            let versesSize = verses.length - 1;
            let randomVerses = Math.floor(Math.random() * versesSize);
            console.log('random verses', randomVerses)
            console.log(verses[randomVerses])
            res.json({
                status: true,
                verse: verses[randomVerses],
                book: randomBook.replace(/-/g, ' ')
            })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // res.json({ status: false })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

})

router.get('/api/random/gifs', (req, res) => {
    var docRef = db.collection("dribb")
    var key = docRef.doc().id;
    docRef.where(admin.firestore.FieldPath.documentId(), '>=', key).limit(1).get()
        .then(snapshot => {
            if (snapshot.size > 0) {
                snapshot.forEach(doc => {
                    console.log(doc.id, '=>', doc.data());
                    res.json({
                        data: doc.data().data,
                        status: true
                    })
                });
            }
        })

})

router.get('/api/random/fyodor', (req, res) => {
    let fyPage = Math.floor(Math.random() * 197) + 1;
    var docRef = db.collection("fyodor").doc('page' + '-' + fyPage);
    console.log('fyPage', fyPage)
    docRef.get().then(function (doc) {
        if (doc.exists) {
            let dataQt = doc.data().data;
            let docRandom = Math.floor(Math.random() * (dataQt.length - 1));
            res.json({
                data: dataQt[docRandom],
                status: true
            })

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // res.json({ status: false })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
})
router.get('/api/getArticle', (req, res) => {
    let articleUrl = "https://newsapi.org/v2/everything?q=general&apiKey="+ process.env.NEWAPI_KEY_CLIENT + "&pageSize=100";
    console.log('article url',articleUrl)
    axios.get(articleUrl).then((articleResponse) => {
        console.log(articleResponse.data);
        res.send({
            data: articleResponse.data,
            status: true
        })
    })
    .catch(err => {
        console.log('error',err)
        res.json({
            error: err,
            status: false
        })
    })
})

getWebpageDocument = (collection) =>{
    switch(collection){
        case 'nominees':
        case 'honorable':
            return Math.floor(Math.random() * 312);
        case 'site-of-the-day':
            return Math.floor(Math.random() * 130);
        default:
            return 1;
    }
}
router.get('/api/random/webpage', (req, res) => {
    let webpageCollectionSize = webpageCollections.length
    let randomWPCollection = Math.floor(Math.random() * webpageCollectionSize);
    console.log('randomWPCollection', randomWPCollection)
    let webpageDocument = getWebpageDocument(webpageCollections[randomWPCollection])
    console.log('webpageDocument', webpageDocument)
    var docRef = webPageDb.collection(webpageCollections[randomWPCollection]).doc("page-" + webpageDocument);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            let webpage = doc.data();
            console.log('webpage')
            res.json({ dataList: webpage, collection: webpageCollections[randomWPCollection] })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            // res.json({ status: false })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

})

module.exports = router;