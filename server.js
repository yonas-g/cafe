require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('morgan')
const app = require('express')()

const orderApi = require('./api/orderApi')

/** Config */
const PORT = process.env.PORT || 5000
const uri = process.env.URI
const database = process.env.DATABASE_NAME

app.use(logger('dev'))

/** Mongoose */
let url = uri + database

mongoose.connect(process.env.URI_TEST + '/test', { useNewUrlParser: true }, err => {
    err ? console.log('Error Connecting to DB', err) : console.log('DB Connected');
})

/** PATH */
app.use('/order', orderApi)

app.listen(PORT, () => {
    console.log(`Server started. PORT: ${PORT}`);
})

