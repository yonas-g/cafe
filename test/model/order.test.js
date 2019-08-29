const Order = require('../../model/order').Order
const Available = require('../../model/available').Available

let testOrder = new Order({
    from: "yonas",
    orders: [
        {
            name: new Available({
                name: 'Coffee'
            }),
            amount: 10
        }
    ]
})

// testOrder.save().then(doc => {
//     console.log(doc)
// }).catch(err => {
//     console.log(err)
// })

testOrder.save((err, order) => {
    err ? console.log(err) : console.log(order);
})

// let newOrder = new Order({
    //     from: 'Yonas',
    //     orders: [
    //         {
    //             name: new Available({
    //                 name: 'Coffee'
    //             }),
    //             amount: 4
    //         },
    //         {
    //             name: new Available({
    //                 name: 'Tea'
    //             }),
    //             amount: 2
    //         }
    //     ]
    // })

    // newOrder.save((err, order) => {
    //     err ? console.log(err) : console.log(order);
    // })