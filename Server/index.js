require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const express = require('express');
const app = express();

const PORT = +process.env.PORT || 3001;

const fs = require('fs');
const typeDefs = fs.readFileSync('./GraphQL/typeDefs.graphql', 'utf-8');
const resolvers = require('./GraphQL/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

app.listen(PORT, async () => {
  try {
    await server.start();
    server.applyMiddleware({ app });
    console.log(`Server running at http://localhost:${PORT}/graphql 🚀`);
  } catch (e) {
    console.error(e);
  }
}); 