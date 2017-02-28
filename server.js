require('dotenv').config()
var express = require('express')
var multer = require('multer')
var mongo = require('mongodb').MongoClient
var fs = require('fs')
var upload = multer({
    dest: 'public/profile_images'
})
var app = express()
var request = require('request')
var bcrypt = require('bcrypt')
var session = require('express-session')
var bodyParser = require("body-parser")

var db_url = process.env.MONGODB_URI
var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}))

const saltRounds = 10

var venmo_oauth = "https://api.venmo.com/v1/oauth"

app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

function findUser(username, found) {
    mongo.connect(db_url,
        (err, db) => {
            if (err) throw err

            var users = db.collection('users')
            var query = {
                username: username
            }

            users.findOne(query,
                (err, user) => {
                    if (err) {
                        found(false)
                        throw err
                    }
                    if (user)
                        found(true, user)
                    else
                        found(false)
                }
            )
            db.close();
        })
}

function insertUserInfo(userinfo, inserted) {
    mongo.connect(db_url,
        (err, db) => {
            if (err) throw err

            var users = db.collection('users')

            bcrypt.hash(userinfo.password, saltRounds)
                .then((hash) => {
                    var hashed_userinfo = {
                        username: userinfo.username,
                        hash: hash
                    }
                    users.insert(hashed_userinfo, (err, data) => {
                        if (err) {
                            inserted(false)
                            throw err
                        }
                        inserted(true)
                    })
                })

            .then(() => {
                db.close()
            })

        })
}

app.post('/api/login', (req, res) => {
    if (req.body.username && req.body.password) {
        findUser(req.body.username,
            (found, user) => {
                if (found) {
                    bcrypt.compare(req.body.password, user.hash).then(function(isUser) {
                        if (isUser) {
                            req.session.username = req.body.username
                            res.status(200).json({msg: 'loggin success'})
                        }
                        else
                            res.status(500).json({
                                error: 'Invalid username or password.'
                            })
                    })
                }
                else {
                    res.status(500).json({
                        msg: 'user does not exist'
                    })
                }
            })
    }
    else
        res.status(500).json({
            error: 'no username and/or password'
        })
})

app.post('/api/signup', (req, res) => {

    if (req.body.username && req.body.password) {
        findUser(req.body.username,
            (found) => {
                if (!found) {
                    insertUserInfo(req.body,
                        (inserted) => {
                            if (inserted)
                                res.status(200).json({
                                    msg: 'success'
                                })
                            else
                                res.status(500).json({
                                    error: 'unknown error'
                                })
                        }
                    )
                }
                else {
                    res.status(500).json({
                        error: 'user exists'
                    })
                }
            })
    }
    else {
        res.status(500).json({
            error: 'no username and/or password'
        })
    }
})

app.post('/api/imgupload', upload.single('file'), (req, res) => {

    if (type == 'image') {
        var type = req.file.mimetype.split('/')[0]
        var ext = req.file.mimetype.split('/')[1]

        var newPath = req.file.path + "." + ext
        fs.rename(req.file.path, newPath, () => {})

        // if url exists (user has uploaded image), delete existing image before inserting new url
        // update url

        res.send('') //success: redirect? or send message?
    }
    else
        res.send({
            error: 'File type not supported.'
        })

})

app.post('/api/venmo_oauth/', (req, res) => {
    var params = '/authorize?client_id=' + client_id
    params += '&scope=make_payments%20access_profile'
    params += '&response_type=code'
    var url = venmo_oauth + params
    request(url, (err, data, body) => {
        if (err) throw err
            //success: venmo passes code through /api/venmo route
    })
})

app.get('/api/venmo', (req, res) => {

    if (req.query.code) {
        var authorization_code = req.query.code

        var params = {
            client_id: client_id,
            client_secret: client_secret,
            code: authorization_code
        }

        var url = venmo_oauth + '/access_token'
        request.post(url, params, (err, res, data) => {
            if (err) throw err
            res.send(data) // data contains user info in JSON format
        })
    }
    else if (req.query.error) {
        res.send(req.query.error) //user has chosen not to authorize app to access venmo account info
    }
    else {
        res.send({
            error: 'No code received.'
        })
    }

})

app.listen(process.env.PORT)
