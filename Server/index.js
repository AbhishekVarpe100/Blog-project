const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const UserModel = require('./models/UserModel')
const PostModel = require('./models/PostModel')
const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.static('public'))


const DB='mongodb+srv://abhishekvarpe634:abhi@cluster0.fe7gdxl.mongodb.net/blogproject?retryWrites=true&w=majority'
mongoose.connect(DB).then(()=>{
    
    console.log("Connection successfully")
})


.catch((err)=>{
    console.log("No connection to database")
});
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ username, email, password })
                .then((user) => res.json(user))
                .catch((err) => res.json(err))
        }).catch((err) => console.log(err))
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


app.put('/editpost/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findByIdAndUpdate({ _id: id }, { title: req.body.title, description: req.body.description })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))

})

app.delete('/deletepost/:id', (req, res) => {
    PostModel.findByIdAndDelete({ _id: req.params.id })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})

app.post("/create", upload.single('file'), (req, res) => {
    PostModel.create({
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename
    })
        .then(result => res.json("Success"))
        .catch(err => res.json(err))
})

app.get('/getpostbyid/:id', (req, res) => {
    const id = req.params.id;
    PostModel.findById({ _id: id })
        .then(post => res.json(post))
        .catch(err => console.log(err))
})

app.get('/getposts', (req, res) => {
    PostModel.find()
        .then(posts => res.json(posts))
        .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email, password: password })
        .then(user => {
            if (user) {
                return res.json("Success")
            }
            else {
                return res.json("User not exist");
            }
        })
})

app.listen(3001, () => {
    console.log("Server is running")
})