var express = require('express')
var multer = require('multer')
var mongo = require('mongodb').MongoClient
var fs = require('fs')
var upload = multer({
    dest: 'public/profile_images'
})
var app = express()

var db_url = process.env.MONGODB_URI

app.use(express.static('public'))

app.post('/api/login', function(req, res) { //convert
    //query username and password then compare
    //success: return user info
    //fail: return error
})

app.post('/api/signup', function(req, res) {
    //success: insert username and hashed password, log user in (return user info)
    //fail: send error message
})

app.post('/api/venmo', function(req, res) {
    //
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

app.listen(process.env.PORT)
