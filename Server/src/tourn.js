// @ts-nocheck
'use strict';
require('dotenv').config();

const server = require('./GraphQL');
const { mongoose } = require('./Models');

try {
  mongoose.connect(process.env.DB_URI, () => {
    console.log('Connected to Mongo Atlas! 🍃');
    try {
      server.listen(4000).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
      });
    } catch (e) {
      console.error('Wrong server connection', e);
    }
  });
} catch (e) {
  console.error('Wrong connection to Locations DB', e);
}
