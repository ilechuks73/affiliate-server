const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Order = require('../../models/Order')
const Product = require('../../models/Product')
const auth = require('../../middleware/auth')

mongoose.Promise = global.Promise
// add order
router.post('/', (req, res) => {
    Product.findById(req.body.productId)
    .then(result => {
        if(!result){
            return res.status(404).json({
                message: 'Product Not Found!'
            })
        }
        const newOrder = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId,
        })
        return newOrder.save()
    })
    .then(data => {
            res.status(200).json({
                message: 'Order created successfully',
                output: {
                    _id: data._id,
                    product: data.product,
                    quantity: data.quantity
                },
                link: {
                    type: 'GET',
                    url: 'http://localhost:5000/order/' + data._id
                    }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    })


//get orders
router.get('/', (req, res) => {
    Order.find()
    .sort({ date: -1})
    .then(data => {
        res.status(200).json({
            count: data.length,
            result: data.map(order => {
                return {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    link: {
                    type: 'GET',
                    url: 'http://localhost:5000/order/' + order._id
                    }
                }
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//get a single order
router.get('/:orderId', (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
    .then(order => {
        if(!order){
            return res.status(404).json({
                message: 'Order Not Found!'
            })
        }
        res.status(200).json(order)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

//edit order
router.put('/update/:orderId', (req, res) => {
    const id = req.params.orderId
    Order.findById(id)
    .then(single => {
        if(!single){
            res.status(404).json({
                message: `Order with the Id: ${id} cannot be found`
            })
        }else {
            single.quantity = req.body.quantity
        }

        single.save()
        .then(data => {
            res.status(200).json({
                message: 'Order updated successfully',
                result: data
            })
        })
        .catch(err => {
            res.status(500).json({
                 error: err
            })
        })
    })
})

//delete order
router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId
    Order.remove({_id: id})
    .then(success => {
        res.status(200).json({
            message: 'Order deleted successfully',
            success
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router