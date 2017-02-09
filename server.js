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

var db_url = process.env.MONGODB_URI
var client_id = process.env.CLIENT_ID
var client_secret = process.env.CLIENT_SECRET

var venmo_oauth = "https://api.venmo.com/v1/oauth"

app.use(express.static('public'))

app.post('/api/login', function(req, res) {
    //use passport module?
    //query username and password then compare
    //success: return user info
    //fail: return error
})

app.post('/api/signup', function(req, res) {
    //success: insert username and hashed password, log user in (return user info)
    //fail: send error message
})

app.post('/api/imgupload', upload.single('file'), function(req, res) {

    if (type == 'image') {
        var type = req.file.mimetype.split('/')[0]
        var ext = req.file.mimetype.split('/')[1]

        var newPath = req.file.path + "." + ext
        fs.rename(req.file.path, newPath, function() {})

        // if url exists (user has uploaded image), delete existing image before inserting new url
        // update url

        res.send('') //success: redirect? or send message?
    }
    else
        res.send({
            error: 'File type not supported.'
        })

})

app.post('/api/venmo_oauth/', function(req, res) {
    var params = '/authorize?client_id=' + client_id
    params += '&scope=make_payments%20access_profile'
    params += '&response_type=code'
    var url = venmo_oauth + params
    request(url, function(err, data, body) {
        if (err) throw err
        //success: venmo passes code through /api/venmo route
    })
})

app.get('/api/venmo', function(req, res) {

    if (req.query.code) {
        var authorization_code = req.query.code

        var params = {
            client_id: client_id,
            client_secret: client_secret,
            code: authorization_code
        }

        var url = venmo_oauth + '/access_token'
        request.post(url, params, function(err, res, data){
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
