const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = new express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3002;
var fs = require('fs');

// firebase

var admin = require("firebase-admin");
var serviceAccount = require("./config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://words-movies.firebaseio.com"
});
let db = admin.firestore();

// movie list

let filmList = ['dunkirk', 'forrest-gump', 'moonlight', 'no-country-for-old-men', 'pulp-fiction', 'spotlight', 'blood-diamond'
    , 'django-unchained', 'fight-club', 'inglourious-basterds', 'cuckoo-nest', 'reservoir-dogs', 'monte-cristo', 'godfather'
    , 'grand-budapest', 'godfather-2', 'catch-22', 'catch-me-if-you-can', 'hacksaw-ridge', 'inception', 'into-the-wild', '1984'
    , 'rango','the-grapes-of-wrath','to-kill-a-mokingbird','whiplash']


// fs.readFile('./subtitlefiles/whiplash.720p.BluRay.x264.YIFY.srt', 'utf8', function (err, data) {
//     if (err) throw err;
//     let arrowSplitData = data.split('-->')
//     let dataRemovedData = arrowSplitData.filter(data => data !== 'data');
//     let dialogue = []
//     dataRemovedData.forEach((data) => {
//         let onlyDialogue = data.replace(/[^A-Za-z, .?!']+/g, ' ');
//         let removedComma = onlyDialogue.slice(4, onlyDialogue.length - 4);
//         if (removedComma[0] === 'i') {
//         } else {
//             dialogue.push(removedComma.replace(/^\s+/g, ''));
//         }
//     })
//     let removeFirstAndLast = dialogue.slice(10, dialogue.length - 10)
//     console.log('removeFirstAndLast', removeFirstAndLast)

//     db.collection("words").doc('whiplash').set({
//         data: removeFirstAndLast
//     }, { merge: true }).then(() => {
//         console.log('data saved')
//     }).catch((err) => console.log(err))
// });


// twit config 

const Twit = require('twit');
const config = require('./config/twit');
const Twitter = new Twit(config);

tweetSaying = () => {
    let tweet = {
        status: ''
    }
    // getting data from firebase 

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
            // res.json({ status: true, sayings: sayings[randomSaying], film: filmList[randomFilm] })
            tweet.status = sayings[randomSaying] // .replace(/ /g, "")
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
tweetSaying();
setInterval(tweetSaying, 1000*1800);



// schema

const User = require('./models/userSchema')
const Blogs = require('./models/blogSchema');
const Tasks = require('./models/taskSchema')

app.use(express.static(path.join(__dirname, 'build')));


// User.create({
//     name: 'test name',
//     email: 'email',.b
//     password: 'password'
// });

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.post('/api/login', (req, res) => {
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
app.get('/api/blogs', (req, res) => {
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
app.get('/api/tasks', (req, res) => {
    getAllTask(req, res)
})

app.post('/api/add-post', (req, res) => {
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

app.post('/api/add-task', (req, res) => {
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

app.get('/test', (req, res) => {
    res.json({ status: 'sucess' })
})

app.post('/api/delete-post', (req, res) => {
    console.log('resssssss', req.body)
    Blogs.deleteOne({ _id: req.body.id }).then((data) => {
        if (data) {
            getAllBlogPost(req, res)
        }
    })
})
app.post('/api/edit-post', (req, res) => {
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
app.post('/api/delete-task', (req, res) => {
    console.log('resssssss', req.body)
    Tasks.deleteOne({ "_id": Object(req.body.id) }).then((data) => {
        if (data) {
            getAllTask(req, res)
        }
    })
})

app.get('/api/random', (req, res) => {
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


// extracting words 







app.listen(port, () => {
    console.log('server is running up')
})
