module.exports = function(app) {

    var trade = require('../model/trade.schema.js');

    var tradeResult = {};

    tradeResult.deleteAllTrades = function(req, res) {

        trade.remove({}).exec().then(result => {
            res.status(200).json({
                result
            });
        }).catch(err => {
            console.log(err)
        });
           
    }
        
    return tradeResult;
}