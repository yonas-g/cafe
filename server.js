require('dotenv').config()
const mongoose = require('mongoose')
const logger = require('morgan')
const app = require('express')()

const orderApi = require('./api/orderApi')

const PORT = process.env.PORT || 5000

app.use(logger('dev'))
app.use('/order', orderApi)


app.listen(PORT, () => {
    console.log(`Server started. PORT: ${PORT}`);
})

