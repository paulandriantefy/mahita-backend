const express = require('express')
const serviceCtrl = require('../controllers/service')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/add', auth, serviceCtrl.addService)
router.put('/update/:id', serviceCtrl.updateService)
router.delete('/delete/:id', serviceCtrl.deleteService)
router.get('/details/:id', serviceCtrl.serviceDetails)
router.get('/', serviceCtrl.getServices)
router.get('/:userId', serviceCtrl.getServiesByUser)

module.exports = router
