const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getWishlist,addWishlistItem,removeWishlistItem } = require('../controllers/wishlistController');


router.get('/:userId/:folderName',authorization, getWishlist);
router.post("/:userId/:proId/:folderName",authorization, addWishlistItem);
router.delete('/:userId/:proId/:folderName',authorization, removeWishlistItem);
// router.put('/:id', upload.single('advertisement'), updateAdvertisementById);

    

module.exports = router;
