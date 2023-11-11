const express = require('express')
const landLordController = require('../controllers/landlord')
const ensureToken = require('../token')


const router = express.Router();

router.post('/register', landLordController.createLandlord);
router.get('/get/one/:id', ensureToken, landLordController.getCurrentLandLord);
router.get('/get/all', ensureToken, landLordController.getAllLandlords)

module.exports = router;