// @ts-nocheck
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const main = async () => {
  
  const app = express();
  app.use(cors());
  
  const PORT = +process.env.PORT || 5050;
  
  const typePath = path.join(__dirname, '/GraphQL/typeDefs.graphql');
  const typeDefs = fs.readFileSync(typePath, 'utf-8');
  const resolvers = require('./GraphQL/resolvers');
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
  });
  await server.start();
  server.applyMiddleware({ path: "graphql", app });
  console.log(`Apollo Server running at http://localhost:${PORT}/graphql 🚀`);
  
  // try {
  //   mongoose.connect(process.env.DB_URI, () => {
  //     console.log('Connected to Mongo Atlas! 🍃');
  //     app.listen(PORT, async () => {
  //       try {
  //       } catch (e) {
  //         console.error('Wrong server connection', e);
  //       }
  //     });
  //   });
  // } catch (e) {
  //   console.error('Wrong connection to Locations DB', e);
  // }
};

module.exports = main;

