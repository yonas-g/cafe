const mongoose = require('mongoose')
const AvailableSchema = require('./available').AvailableSchema

const OrderSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    orders: [
        {
            name: {
                type: AvailableSchema,
                required: true
            },
            amount: {
                type: Number,
                default: 0
            }
        }
    ],
    time: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model('orders', OrderSchema)

module.exports = {
    Order,
    OrderSchema
}