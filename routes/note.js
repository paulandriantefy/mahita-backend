const express = require('express');
const noteCtrl = require('../controllers/note');

const router = express.Router();

router.post('/add', noteCtrl.giveNote);
router.get('/detail/:id', noteCtrl.getNotesByUser);
router.get('/moyenne/:id', noteCtrl.avgUserNote);
router.get('/prestataires', noteCtrl.getNotes);

module.exports = router;