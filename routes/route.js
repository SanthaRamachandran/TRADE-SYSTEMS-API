module.exports = function(app) {
    try {
        var createTrade = require('../controllers/createtrade.js')(app);
        var getTrades =  require('../controllers/gettrades.js')(app);
        var deleteTrades = require('../controllers/deletetrades.js')(app);

        app.get('/trades', getTrades.getAllTrades);
        app.get('/trades/users/:userId', getTrades.getTradesByUsedId);
        app.get('/stocks/:stockSymbol/trades',getTrades.getStocks);
        app.get('/stocks/:stockSymbol/price',getTrades.getStocksByPrice);
        app.post('/trades', createTrade.addTrade);
        app.delete('/erase', deleteTrades.deleteAllTrades)


    } catch (e) {
        console.log("Error On Routing--", e);
    }
}