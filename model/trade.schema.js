var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema ({
        _id: mongoose.Schema.Types.ObjectId,
        tradeId: {
            type: Number, required: true
        },
        type: {
            type: String, required: true, enum: ['buy', 'sell']
        },
        user: {
            id: { type: mongoose.Schema.Types.ObjectId, required: true},
            name:  { type: String }
        },
        symbol: {
            type: String
        },
        shares: {
            type: String, required: true
        },
        price: {
            type: String, required: true
        },
        startDate : {
            type: Date, required: true
        },
        endDate : {
            type: Date, required: true
        }
})

var trade = mongoose.model('TradeSchema', tradeSchema)
 
module.exports = trade;