// @ts-nocheck
const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  altitude: Number,
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

module.exports = locationsSchema;
