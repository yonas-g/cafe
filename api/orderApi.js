const router = require('express').Router()
const moment = require('moment')

const Order = require('../model/order').Order
const Available = require('../model/available').Available

router.get('/', (req, res) => {
    Order.find({}, (err, orders) => {
        err ?
            res
                .status(500)
                .json({
                    ok: false,
                    message: 'DATABASE FETCH ERROR',
                    error: err
                }) :
            res
                .status(200)
                .json({
                    ok: true,
                    message: 'AVAILABLE_ORDERS',
                    data: orders
                })
    })
})

router.post('/', (req, res) => {

    let { from, orders } = req.body

    Order.create({
        from,
        orders: orders.map(order => {
            return {
                name: new Available({
                    name: order.name
                }),
                amount: order.amount
            }
        })
    }, (err, order) => {
        err ?
            res.status(500).json({
                ok: false,
                error: err
            }) :
            res.status(200).json({
                ok: true,
                order: order
            })
    })
})

router.get('/now', (req, res) => {
    let orderStartTime = moment(Date.now()).subtract('30', 'minute');

    Order.find({ time: { $gte: orderStartTime } }, (err, orders) => {
        err ?
            res.status(500).json({
                ok: false,
                error: err
            }) :
            res.status(200).json({
                ok: true,
                message: 'TODAY_ORDERS',
                orders: orders
            })
    })
})

router.get('/date', (req, res) => {
    let date = req.body.date

    let startDate = moment(date).utcOffset(0)
    startDate.set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }).toISOString()

    let endDate = moment(date).utcOffset(0)
    endDate.set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999
    }).toISOString()

    Order.find({
        time: {
            $lte: endDate,
            $gte: startDate
        }
    }, (err, orders) => {
        err ?
            res.status(500).json({
                ok: false,
                error: err
            }) :
            res.status(200).json({
                ok: true,
                message: 'ORDERS_AT_DATE',
                orders: orders
            })
    })
})

module.exports = router