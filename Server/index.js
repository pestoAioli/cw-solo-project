require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const app = express();
app.use(cors());

const PORT = +process.env.PORT || 3001;

const fs = require('fs');
const typeDefs = fs.readFileSync('Server/GraphQL/typeDefs.graphql', 'utf-8');
const resolvers = require('./GraphQL/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

try {
  mongoose.connect(process.env.DB_URI, () => {
    console.log('Connected to Mongo Atlas! 🍃');
    app.listen(PORT, async () => {
    try {
      await server.start();
      server.applyMiddleware({ app });
      console.log(`Apollo Server running at http://localhost:${PORT}/graphql 🚀`);
    } catch (e) {
      console.error('Wrong server connection', e);
    }
    }); 
  });
} catch (e) {
  console.error('Wrong connection to Locations DB', e);
}
