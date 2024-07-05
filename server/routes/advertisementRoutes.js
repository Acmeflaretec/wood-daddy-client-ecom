const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getAdvertisement,addAdvertisement,getAdvertisementById,deleteAdvertisementById,updateAdvertisementById  } = require('../controllers/advertisementController');
const { upload } = require('../middlewares/multer');

router.get('/', getAdvertisement);
router.post("/", upload.single('advertisement'), addAdvertisement);
router.get('/:id', getAdvertisementById);
router.delete('/:id', deleteAdvertisementById);
router.patch('/', upload.single('advertisement'), updateAdvertisementById);

 

module.exports = router;
