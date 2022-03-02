"use strict";

const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");

module.exports = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
});
