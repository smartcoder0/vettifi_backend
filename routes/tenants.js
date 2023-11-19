const express = require('express')
const tenantController = require('../controllers/tenants')
const ensureToken = require("../token")

const router = express.Router();

router.post('/register/:id', tenantController.createTenant);
router.get('/get/one/:id', ensureToken, tenantController.getCurrentTenant);
router.get('/get/all', ensureToken, tenantController.getAllTenants);

module.exports = router;