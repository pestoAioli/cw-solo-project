// @ts-nocheck
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  coordinates: [Number],
  altitude: Number,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  discovered_by: {
    type: [ObjectId]
  },
  first_descovered: {
    type: [ObjectId]
  },
  comments: {
    comment: [ObjectId]
  }
});

const Locations = mongoose.model('Locations', eventSchema);
module.exports = Locations;