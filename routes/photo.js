const express = require('express')
const photoCtrl = require('../controllers/photo')
const multer = require('../middleware/multer-config')
const multerSingle = require('../middleware/multer-single-config')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/add', auth, multer, photoCtrl.addPhoto)
router.delete('/delete/:id', auth, photoCtrl.delete)
router.post('/modify', auth, multerSingle, photoCtrl.modifyPhotoProfil)
module.exports = router
