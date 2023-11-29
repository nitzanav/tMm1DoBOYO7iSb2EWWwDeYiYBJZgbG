const {sumBy} = require('lodash') // keeping lambda source code small
const uuid = require('uuid')
const {Order, OrderItem} = require('./order')
const {invokeAsync} = require('./invokeLambda')

async function postOrders(event) {
    const order = await createOrder(event)
    await Promise.all([
        invokeAsync('invoicingService', {action: 'create', order}),
        invokeAsync('paymentService', {action: 'processPayment', order}),
        invokeAsync('shipmentService', {action: 'requestShipment', order}),
    ])

    return {
        statusCode: 201,
        body: JSON.stringify(order),
    }

}

async function createOrder(event) {
    // TODO: Need to validate that item prices, and all the shopping cart data was not hacked. Better be done wit ha signature vs. the database.

    const orderId = uuid.v4()
    const body = JSON.parse(event.body)
    const items = body.items
    const shipmentDetails = body.shipmentDetails
    const preApprovedPayment = body.preApprovedPayment
    const totalAmount = sumBy(items, 'productPrice')
    return await Order.create(
        {
            orderId,
            items,
            shipmentDetails,
            preApprovedPayment,
            totalAmount,
        },
        {
            include: [OrderItem],
        }
    )
}

module.exports = postOrders