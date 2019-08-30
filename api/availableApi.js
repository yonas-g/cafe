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
    if (!req.body.name) {
        res
            .status(400)
            .json({
                ok: false,
                message: 'NAME_FIELD_NOT_FOUND'
            })
    } else {
        AvailableItems.create({
            name: req.body.name
        }, (err, item) => {
            err
                ? res
                    .status(500)
                    .json({
                        ok: false,
                        message: 'UNABLE_TO_ADD_ITEM',
                        error: err
                    })
                : res
                    .status(200)
                    .json({
                        ok: true,
                        message: 'ITEM_ADDED',
                        data: item
                    })
        })
    }
})

router.delete('/', (req, res) => {
    AvailableItems.remove({ name: req.body.name }, (err, any) => {
        err
            ? res
                .status(400)
                .json({
                    ok: false,
                    message: 'UNABLE_TO_DELETE_ITEM',
                    error: err
                })
            : res
                .status(200)
                .json({
                    ok: true,
                    message: 'ITEM_DELETED',
                    data: any
                })
    })
})

module.exports = router