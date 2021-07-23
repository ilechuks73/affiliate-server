const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const orderController = require('../../controllers/order')

// add order
router.post('/', auth, orderController.create_orders)
//get orders
router.get('/', auth, orderController.get_all_orders)
//get a single order
router.get('/:orderId', auth, orderController.get_single_order)
//edit order
router.put('/update/:orderId', auth, orderController.edit_order)
//delete order
router.delete('/:orderId', auth, orderController.delete_order)

module.exports = router