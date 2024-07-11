const { Router } = require('express');
const router = Router();
const {  createOrder,getOrderItems,deleteOrderItem,getAllOrders,getOrderById,getAdminOrders,updateOrderStatus
 } = require('../controllers/orderController');
const authorization = require('../middlewares/authorization');

// router.post('/orders', createOrder);
router.post('/createorder/:userId/:addressId', createOrder);
router.get('/',authorization, getAllOrders);
router.get('/getorder/:orderId', getOrderById);
router.get('/orderitem/:userId', getOrderItems);
router.delete('/orderitem/:orderItemId', deleteOrderItem);

router.get('/adminfetch', getAdminOrders);
router.put('/update-status', updateOrderStatus);

 
module.exports = router;