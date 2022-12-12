const express = require('express')
const outilCtrl = require('../controllers/outil')
const router = express.Router()
const auth = require('../middleware/auth')

router.post('/add/user', auth, outilCtrl.addOutilUser)
router.post('/add/mission/', auth, outilCtrl.addOutilMission)
router.put('/disconnect/:outilId', auth, outilCtrl.disconnectOutil)
router.get('/mission/:idMission', outilCtrl.getOutilByMission)
router.get('/nom/:nom', outilCtrl.getOutilByName)

module.exports = router
