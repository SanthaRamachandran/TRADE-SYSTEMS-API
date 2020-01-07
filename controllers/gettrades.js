module.exports = function(app) {

    var trade = require('../model/trade.schema.js');

    var tradeResult = {};

    tradeResult.getAllTrades = function(req, res) {

        trade.find({}).exec().then(result => {
            res.status(200).json({
                result
            });
        }).catch(err => {
            console.log(err)
        });
           
    }

    tradeResult.getTradesByUsedId = function(req, res) {

        var userId = req.params.userId;
        trade.find({"user.id" : userId}).sort({"tradeId":1}).exec().then(result => {
            if(result.length > 0) 
            {
                res.status(200).json({
                    result
                });
            } else {
                result = {
                    "message" : "Data not found"
                }
                res.status(404).json({
                    result
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

    tradeResult.getStocks = function(req, res) {

        var stockSymbol = req.params.stockSymbol;
        var startDate = req.query.start;
        var endDate = req.query.end;
        var type = req.query.type;

        trade.find(
            {
                $and: [
                    {"symbol": stockSymbol}, {"type":type}, 
                    {'startDate': { $gte: startDate } },
                    {'endDate': { $lte: endDate } },
                 ]
            } ).sort({"tradeId":1}).exec().then(result => {
            if(result.length > 0) 
            {
                res.status(200).json({
                    result
                });
            } else {
                result = {
                    "message" : "Stocks not found"
                }
                res.status(404).json({
                    result
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

    tradeResult.getStocks = function(req, res) {

        var stockSymbol = req.params.stockSymbol;
        var startDate = req.query.start;
        var endDate = req.query.end;
        var type = req.query.type;

        trade.find(
            {
                $and: [
                    {"symbol": stockSymbol}, {"type":type}, 
                    {'startDate': { $gte: startDate } },
                    {'endDate': { $lte: endDate } },
                 ]
            } ).sort({"tradeId":1}).exec().then(result => {
            if(result.length > 0) 
            {
                res.status(200).json({
                    result
                });
            } else {
                result = {
                    "message" : "Stocks not found"
                }
                res.status(404).json({
                    result
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

    tradeResult.getStocksByPrice = function(req, res) {

        var stockSymbol = req.params.stockSymbol;
        var startDate = req.query.start;
        var endDate = req.query.end;


        trade.find(
            {
                $and: [
                    {"symbol": stockSymbol},
                    {'startDate': { $gte: startDate } },
                    {'endDate': { $lte: endDate } },
                 ]
            }).sort({"price" : -1}).exec().then(result => {
                
            if(result.length > 0) 
            {
                let resultData = {
                    "symbol" : stockSymbol,
                    "highest": result[0].price,
                    "lowest" : result[result.length-1].price
                }
                res.status(200).json({
                    resultData
                });
            } else {
                result = {
                    "message":"There are no trades in the given date range"
                }
                res.status(404).json({
                    result
                });
            }
        }).catch(err => {
            console.log(err)
        });
    }

        
    return tradeResult;
}