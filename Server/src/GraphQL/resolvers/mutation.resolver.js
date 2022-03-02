// 'use strict';

// const db = require('../db');
// const { reduceMatches, writeJSON } = require('../../helpers/helper');

// // Export the function to update the match type
// exports.updateMatch = (_, { id, ...props } ) => {
//   const match = reduceMatches(db.groups, db.knockout).find(match => id && match.id === id);
//   if (!match) {
//     throw new Error(`Couldn't find match with id ${id}`);
//   }
//   Object.assign(match, props);
//   writeJSON(db);
//   return match;
// };
