const config = require('./config')
const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize(config.sequelize)

const Order = sequelize.define('Order', {
    orderId: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
        allowNull: false,
    },
    shipmentDetails: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    preApprovedPayment: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
})

const OrderItem = sequelize.define('OrderItem', {
    productId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productPrice: {
        type: DataTypes.DECIMAL(20, 2),
        allowNull: false,
    },
})

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem, {as: 'orderItems', onDelete: 'CASCADE'})

module.exports = {
    Order,
    OrderItem,
}