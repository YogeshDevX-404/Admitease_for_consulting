const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    interestedCourse: { type: String, required: true },
    collegeSlug: { type: String },
    collegeName: { type: String },
    budgetRange: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Converted', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
