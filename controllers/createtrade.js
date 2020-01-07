module.exports = function(app) {
     
    var mongoose = require('mongoose');
    var Trade = require('../model/trade.schema.js');

    var tradeResult = {};

    tradeResult.addTrade = function(req, res) {
        //console.log("req----", req)

        const tradeData = new Trade({
            _id: mongoose.Types.ObjectId(),
            tradeId: req.body.id,
            type: req.body.type,
            user: {
                id: mongoose.Types.ObjectId(),
                name: req.body.username
            },
            symbol:req.body.symbol,
            shares: req.body.shares,
            price: req.body.price,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        });

        Trade.find({"tradeId": req.body.id }).exec().then(result => {
            if(result.length > 0 ) {
                var data =  {
                    "status" : "error",
                    "message": "Data already exist"
                 };

                res.status(200).json({
                    data
                });
            } else {
                tradeData.save().then(result => {
                    res.status(200).json({
                        docs:[tradeData]
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err)
        });
           
    }
        
    return tradeResult;
}