"use strict";

const query = require("./query.resolver");
// const mutation = require('./mutation.resolver');
// const types = require('./types.resolver');

const resolvers = {
  Query: {
    getLocation: query.getLocation,
  },
};

module.exports = resolvers;
