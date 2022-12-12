const express = require('express')
const userCtrl = require('../controllers/user')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/details/:id', userCtrl.userDetails)
router.put('/update/:id', auth, userCtrl.updateUser)
router.put('/modifyPassword/:id', auth, userCtrl.modifyPassword)
router.get('/search', userCtrl.search)

module.exports = router
