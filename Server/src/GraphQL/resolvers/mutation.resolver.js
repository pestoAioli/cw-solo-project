'use strict';

const { Users } = require('../../Models');

exports.addVisitedDestination = async (_, { userID, locationID }) => {
  try {
    const user = await Users.findById(userID).exec();
    user.visited_locations.addToSet(locationID);
    await user.save();
    return 'done';
  } catch (e) {
    console.log(e);
    return e;
  }
};
