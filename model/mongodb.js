module.exports= function() {
    var mongoose = require('mongoose');

    var trades = require('trade.schema.js');

    var query = db[trades].find();

    query.exec(function(err,docs){
        console.log(err); console.log(docs);
    })
}