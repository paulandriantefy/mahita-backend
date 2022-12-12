const express = require('express')
const missionCtrl = require('../controllers/mission')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/add', auth, missionCtrl.createMission)
router.put('/update/:id', auth, missionCtrl.updateMission)
router.get('/details/:id', missionCtrl.missionDetails)
router.get('/', missionCtrl.getMissions)
router.get('/:userId', missionCtrl.getMissionsByUser)
router.delete('/delete/:id', auth, missionCtrl.delete)

module.exports = router
