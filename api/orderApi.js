const router = require('express').Router()

const Order = require('../model/order').Order
const Available = require('../model/available').Available

router.get('/', (req, res) => {
    res.json({
        ok: true,
        message: 'AVAILABLE_ORDERS'
    })
})

router.post('/', (req, res) => {

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
        err ? res.json({
            ok: false,
            error: err
        }).status(500) : res.json({
            ok: true,
            order: order
        }).status(200)
    })
})

router.get('/today', (req, res) => {

})


module.exports = router