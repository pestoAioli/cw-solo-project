'use strict';

const query = require('./query.resolver');
const mutation = require('./mutation.resolver');

const resolvers = {
  Query: {
    getRoute: query.getRoute,
    getDestinationInfo: query.getDestinationInfo,
    getUser: query.getUser,
  },
  Mutation: {
    addVisitedDestination: mutation.addVisitedDestination,
  },
};

module.exports = resolvers;
