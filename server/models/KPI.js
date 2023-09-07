const mongoose = require('mongoose');

const kpiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // Additional fields as needed
});

const KPI = mongoose.model('KPI', kpiSchema);

module.exports = KPI;
