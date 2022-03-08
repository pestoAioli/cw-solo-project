'use strict';
const mongoose = require('mongoose');

const locationsSchema = require('./locations');
const Locations = mongoose.model('Locations', locationsSchema);

const usersSchema = require('./users');
const Users = mongoose.model('Users', usersSchema);

module.exports = { mongoose, Locations, Users };
