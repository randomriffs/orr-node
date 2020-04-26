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
var admin = require("firebase-admin");
var serviceAccount = require("./config/words-movies-firebase-adminsdk-udl0t-722049ea9f.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://words-movies.firebaseio.com"
});
let db = admin.firestore();
let filmList = ['dunkirk', 'forrest-gump', 'moonlight', 'no-country-for-old-men', 'pulp-fiction', 'spotlight', 'blood-diamond'
    , 'django-unchained', 'fight-club', 'inglourious-basterds', 'cuckoo-nest', 'reservoir-dogs', 'monte-cristo', 'godfather'
    , 'grand-budapest', 'godfather-2']

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
            res.json({ status: true, sayings: sayings[randomSaying] })

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


// fs.readFile('./subtitlefiles/The.Godfather.Part.II.1974.BRRip.XviD.AC3.D-Z0N3 (English).srt', 'utf8', function (err, data) {
//     if (err) throw err;
//     let arrowSplitData = data.split('-->')
//     let dataRemovedData = arrowSplitData.filter(data => data !== 'data');
//     let dialogue = []
//     dataRemovedData.forEach((data) => {
//         let onlyDialogue = data.replace(/[^A-Za-z, .?!']+/g, '');
//         let removedComma = onlyDialogue.slice(2, onlyDialogue.length - 2);
//         let removedI = ''
//         if (removedComma[0] === 'i') {
//             removedI = removedComma.slice(2, removedComma.length - 2)
//         }
//         dialogue.push(removedComma.trim(' '));
//     })
//     let removeFirstAndLast = dialogue.slice(10, dialogue.length - 10)
//     console.log('removeFirstAndLast', removeFirstAndLast)

//     db.collection("words").doc('godfather-2').set({
//         data: removeFirstAndLast
//     }, { merge: true }).then(() => {
//         console.log('data saved')
//     }).catch((err) => console.log(err))
// });


app.listen(port, () => {
    console.log('server is running up')
})
