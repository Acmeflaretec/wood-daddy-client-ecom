const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { getBanners,addBanner,getBannerById,deleteBannerById,updateBanner  } = require('../controllers/bannerController');
const { upload } = require('../middlewares/multer');

router.get('/', getBanners);
router.get('/:id', getBannerById);
router.post('/',upload.single('image'), addBanner);
router.delete('/:id', deleteBannerById);
router.patch('/',upload.single('image'), updateBanner);

 

module.exports = router;
