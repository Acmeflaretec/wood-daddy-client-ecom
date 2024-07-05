const { Router } = require('express');
const router = Router();
const authorization = require("../middlewares/authorization");
const { addContentSection,getContentSection,getWelcomeById,updateWelcome,deleteWelcome } = require('../controllers/contentSectionController');


router.post('/' , addContentSection);
router.get('/', getContentSection);
router.get('/:id', getWelcomeById);
router.patch("/",updateWelcome);
router.delete("/:id", deleteWelcome);


module.exports = router;
