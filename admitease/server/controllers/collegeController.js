const College = require('../models/College');
const slugify = require('slugify');

// GET all colleges (public)
exports.getColleges = async (req, res) => {
  try {
    const { course, minFees, maxFees, affiliation, search } = req.query;
    let query = {};

    if (course) query.courses = { $regex: course, $options: 'i' };
    if (affiliation) query.affiliation = { $regex: affiliation, $options: 'i' };
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minFees || maxFees) {
      query['feesRange.min'] = {};
      if (minFees) query['feesRange.min'].$gte = Number(minFees);
      if (maxFees) query['feesRange.max'] = { $lte: Number(maxFees) };
    }

    const colleges = await College.find(query).sort({ featured: -1, createdAt: -1 });
    res.json({ success: true, count: colleges.length, data: colleges });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET single college by slug (public)
exports.getCollegeBySlug = async (req, res) => {
  try {
    const college = await College.findOne({ slug: req.params.slug });
    if (!college) return res.status(404).json({ success: false, message: 'College not found' });
    res.json({ success: true, data: college });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST create college (admin)
exports.createCollege = async (req, res) => {
  try {
    const slug = slugify(req.body.name, { lower: true, strict: true });
    const college = await College.create({ ...req.body, slug });
    res.status(201).json({ success: true, data: college });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT update college (admin)
exports.updateCollege = async (req, res) => {
  try {
    if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true, strict: true });
    const college = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!college) return res.status(404).json({ success: false, message: 'College not found' });
    res.json({ success: true, data: college });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE college (admin)
exports.deleteCollege = async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) return res.status(404).json({ success: false, message: 'College not found' });
    res.json({ success: true, message: 'College deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
