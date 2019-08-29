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

testOrder.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log(err)
})