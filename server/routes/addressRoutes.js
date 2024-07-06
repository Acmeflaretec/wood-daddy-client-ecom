const express = require('express');
const router = express.Router();
const authorization = require("../middlewares/authorization");
const addressController = require('../controllers/addressController');

router.post('/address',authorization, addressController.createAddress);
router.put('/address/:addressId',authorization, addressController.updateAddress);
router.delete('/:addressId', authorization,addressController.deleteAddress);
router.get('/getaddresses',authorization, addressController.getAddresses);
router.get('/address/:addressId',authorization, addressController.getAddressById);
router.put('/setdefault/:addressId',authorization, addressController.setDefault);
module.exports = router;
