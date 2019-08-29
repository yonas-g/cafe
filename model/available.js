const mongoose = require('mongoose')

const AvailableSchema = new mongoose.Schema({
    name: String
})

const Available = mongoose.model('Available', AvailableSchema)

module.exports = {
    Available,
    AvailableSchema
}