const express = require('express');
const router = express.Router();
const {
  getColleges,
  getCollegeBySlug,
  createCollege,
  updateCollege,
  deleteCollege,
} = require('../controllers/collegeController');
const { protect } = require('../middleware/auth');

router.get('/', getColleges);
router.get('/:slug', getCollegeBySlug);
router.post('/', protect, createCollege);
router.put('/:id', protect, updateCollege);
router.delete('/:id', protect, deleteCollege);

module.exports = router;
