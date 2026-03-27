const express = require('express');
const router = express.Router();
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');
const { protect } = require('../middleware/auth');

router.post('/', createLead);
router.get('/', protect, getLeads);
router.put('/:id/status', protect, updateLeadStatus);

module.exports = router;
