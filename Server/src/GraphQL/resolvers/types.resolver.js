// 'use strict';

// const db = require('../db');
// const { reduceMatches } = require('../../helpers/helper');

// // Match type resolvers
// exports.get_home_team = match => db.teams.find(team => team.name === match.home_team);

// exports.get_away_team = match => db.teams.find(team => team.name === match.away_team);

// exports.get_stadium = match =>
//   db.stadiums.find(stadium => stadium.id === match.stadium_id);

// // Stadium type resolvers
// exports.get_lastPlayed = stadium =>
//   reduceMatches(db.groups, db.knockout)
//     .filter(match => match.stadium_id === stadium.id && match.finished)
//     .sort((a, b) => (a.date < b.date ? 1 : -1))[0];

// // Group type resolvers
// exports.closing_match = group =>
//   Object
//     .values(db.groups)
//     .find(currGroup => currGroup.name === group.name).matches
//     .sort((a, b) => (a.date < b.date ? 1 : -1))[0];
