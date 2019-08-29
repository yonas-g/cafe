require('dotenv').config()
const mongoose = require('mongoose')
const app = require('express')()

const orderApi = require('./api/orderApi')

/** Config */
const PORT = process.env.PORT || 5000
const env = process.env.NODE_ENV
let uri = process.env.URI
let database = process.env.DATABASE_NAME

if (env == 'development') {
    let logger = require('morgan')
    uri = process.env.URI_TEST
    database = process.env.DATABASE_NAME_TEST

    console.log(uri + database);

    app.use(logger('dev'))
}

/** Mongoose */
let url = uri + database

mongoose.connect(url, { useNewUrlParser: true }, err => {
    err ? console.log('Error Connecting to DB', err) : console.log('DB Connected');
})

/** PATH */
app.use('/api/orders', orderApi)

app.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'Welcome'
    })
})

app.listen(PORT, () => {
    console.log(`Server started. PORT: ${PORT}`);
})

