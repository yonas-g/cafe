const router = require('express').Router()
const moment = require('moment')

const Order = require('../model/order').Order
const Available = require('../model/available').Available

router.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'AVAILABLE_ORDERS'
    })
})

router.post('/', (req, res) => {

    // console.log(req.body);
    // res.json(req.body)

    let { from, orders } = req.body

    let order = new Order({
        from: from,
        orders: orders.map(order => {
            return {
                name: new Available({
                    name: order.name
                }),
                amount: order.amount
            }
        })
    })

    order.save((err, order) => {
        err ?
            res.status(500).json({
                ok: false,
                error: 'Server is down'
            }) :
            res.status(200).json({
                ok: true,
                order: order
            })
    })
})

router.get('/today', (req, res) => {
    Order.find({ time: Date.now() }, (err, orders) => {
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


module.exports = router