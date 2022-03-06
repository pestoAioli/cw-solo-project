// @ts-nocheck
'use strict';
require('dotenv').config();

const server = require('./GraphQL');
const { mongoose } = require('./Models');

const IP = '192.168.1.137';
const PORT = 4000;

try {
  mongoose.connect(process.env.DB_URI, () => {
    console.log('Connected to Mongo Atlas! 🍃');
    try {
      server.listen(4000, IP).then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
      });
    } catch (e) {
      console.error('Wrong server connection', e);
    }
  });
} catch (e) {
  console.error('Wrong connection to Locations DB', e);
}
