const mongoose = require('mongoose')

const AvailableSchema = new mongoose.Schema({
    name: String
})

const Available = mongoose.model('available_items', AvailableSchema)

module.exports = {
    Available,
    AvailableSchema
}