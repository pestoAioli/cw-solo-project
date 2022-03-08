// @ts-nocheck
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  visited_locations: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Locations' },
  ],
});

module.exports = usersSchema;
