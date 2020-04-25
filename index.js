const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = new express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3000

// const User = require('./models/userSchema')
// const Blogs = require('./models/blogSchema');
// const Tasks = require('./models/taskSchema')


// // User.create({
// //     name: 'test name',
// //     email: 'email',.b
// //     password: 'password'
// // });

// app.post('/api/login', (req, res) => {
//     let userStatus = {}
//     console.log('req.bodys',req.body)
//     User.findOne({
//         email: req.body.email,
//         password:req.body.password
//     }).then((user)=>{
//         if(user){
//             res.json({status:true,message:'user exists'})
//         }else {
//             res.json({status:false,message:'user not exists'})
//         }
        
//     });
    
// })
// getAllBlogPost = (req,res) =>{
//     Blogs.find({
//     }, (err, result)=> {
//         if (err) throw err;
//         if (result) {
//             res.json(result.reverse())
//         } else {
//             res.send(JSON.stringify({
//                 error : 'Error'
//             }))
//         }
//     })
// }
// app.get('/api/blogs',(req,res)=>{
//     getAllBlogPost(req,res)
// })

// getAllTask=(req,res)=>{
//     Tasks.find({},(err,result)=>{
//         if (err) throw err;
//         if(result){
//             res.json(result)
//         }else {
//             res.send(JSON.stringify({error:'error'}))
//         }
//     })
// }
// app.get('/api/tasks',(req,res)=>{
// getAllTask(req,res)
// })

// app.post('/api/add-post', (req, res) => {
//     console.log('req.bodys',req.body)
//     Blogs.create({
//     title: req.body.title,
//     content: req.body.content,
// }).then((data)=>{
//     if(data){
//         getAllBlogPost(req,res)
//     }
// }); 
// })

// app.post('/api/add-task', (req, res) => {
//     console.log('req.bodys',req.body)
//     Tasks.create({
//     task: req.body.task,
//     isDone: req.body.isDone,
// }).then((data)=>{
//     if(data){
//         getAllTask(req,res)
//     }
// }); 
// })

app.get('/test', (req,res)=>{
    res.json({status:'sucess'})
})

app.listen(port,()=>{
    console.log('server is running up')
})
