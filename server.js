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
    // request(url, function(err, data, body) {})
})

app.get('/api/venmo', function(req, res) {

    if (req.query.code) {
        var authorization_code = req.query.code

        var params = '/access_tokens?'
        params += 'client_id=' + client_id
        params += '&client_secret=' + client_secret
        params += '&code=' + authorization_code

        var url = venmo_oauth + params
        //request.post() //request user info then send to client on success
    }
    else {
        res.send({
            error: 'No code received.'
        })
    }

})

app.listen(process.env.PORT)
