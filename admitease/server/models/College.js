const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    courses: [{ type: String }],
    feesRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      display: { type: String },
    },
    affiliation: { type: String },
    images: [{ type: String }],
    featured: { type: Boolean, default: false },
    placementHighlights: { type: String },
    established: { type: Number },
    rating: { type: Number, default: 4.0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('College', collegeSchema);
