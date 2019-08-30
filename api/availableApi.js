const router = require('express').Router()
const AvailableItems = require('../model/available').Available

router.get('/', (req, res) => {
    AvailableItems.find({}, (err, items) => {
        err
            ? res
                .status(500)
                .json({
                    ok: false,
                    message: 'UNABLE_TO_GET_AVAILABLE_ITEMS',
                    error: err
                })
            : res
                .status(200)
                .json({
                    ok: true,
                    message: 'AVAILABLE_ITEMS',
                    data: items
                })
    })
})

router.post('/', (req, res) => {
    res.json(req.body)
})

router.delete('/', (req, res) => {

})

module.exports = router