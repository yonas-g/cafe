require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = require('express')()

const orderApi = require('./api/orderApi')
const availableApi = require('./api/availableApi')

/** Config */
const PORT = process.env.PORT || 5000
const env = process.env.NODE_ENV
let uri = process.env.URI
let database = process.env.DATABASE_NAME

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (env == 'development') {
    let logger = require('morgan')
    uri = process.env.URI_TEST
    database = process.env.DATABASE_NAME_TEST

    app.use(logger('dev'))
}

/** Mongoose */
let url = uri + database

mongoose.connect(url, { useNewUrlParser: true }, err => {
    err ? console.log('Error Connecting to DB', err) : console.log('DB Connected');
})

/** API PATH */
app.use('/api/orders', orderApi)
app.use('/api/available', availableApi)

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Welcome'
    })
})

app.listen(PORT, () => {
    console.log(`Server started. PORT: ${PORT}`);
})