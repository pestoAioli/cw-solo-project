'use strict';

const { Users } = require('./../../Models');

exports.addVisitedDestination = (_, { userID, ...location }) => {
  try {
    Users.updateOne(
      { _id: userID },
      {
        $push: { visited_locations: location },
      }
    ).exec();
    return 'done';
  } catch (e) {
    console.log(e);
    return e;
  }
};
