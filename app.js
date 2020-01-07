var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var config = JSON.parse(fs.readFileSync(path.join(__dirname,"/config/config.json")), 'utf-8');

try {
    server.listen(config.port, function () {
        console.log('Server running on the port', config.port);
    });
} catch (ex) {
    console.log(ex);
}

var DB_URL = 'mongodb://'+ config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.database; 

mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true  });
mongoose.connection.on('error', function (error) { 
    console.error('Error in MongoDB Connection: ' + error); });
mongoose.connection.on('reconnected', function () { 
    console.log('MongoDB Reconnected !'); });
mongoose.connection.on('disconnected', function () {
     console.log('MongoDB Disconnected !'); });
mongoose.connection.on('connected', function () {
    console.log('MongoDB connected');
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.use(bodyParser.json({ limit: '100mb' }));

    app.use(function (req, res, next) {
        console.log(req.originalUrl);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    require('./routes/route.js')(app);


});