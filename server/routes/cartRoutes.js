const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getCart,addCart,removeCart,increasecartqty,decreasecartqty } = require('../controllers/cartController');


router.get('/:userId', authorization,getCart);
router.post("/:userId/:proId",authorization, addCart);
router.put("/increase/:cartId",authorization, increasecartqty);
router.put("/decrease/:cartId",authorization, decreasecartqty);
router.delete('/:userId/:proId',authorization, removeCart);
// router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;
