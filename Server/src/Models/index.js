"use strict";
const mongoose = require("mongoose");

const locationsSchema = require("./locations");
const Locations = mongoose.model("Locations", locationsSchema);

module.exports = { mongoose, Locations };
