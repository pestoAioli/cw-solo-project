// @ts-nocheck
'use strict';
const fetch = require('node-fetch');
const {
  getTomTomURL,
  getRandomDestination,
} = require('./../../Helpers/routes');

const { Locations, Users } = require('./../../Models');

exports.getRoute = async (_, args) => {
  const { origin, range, filters, type } = args.input;

  try {
    console.log(args.input);
    const dest = await getRandomDestination(origin, range, filters);
    if (!dest) throw new Error();

    const url = getTomTomURL(origin, dest.coordinates, type);
    const result = await fetch(url);
    const route = await result.json();

    return { id: dest.id, route };
  } catch (e) {
    console.error(e);
    return { id: 'error', route: [] };
  }
};

// For testing navigation, it returns a predefined response
exports.getFakeRoute = async () => {
  const path = require('path');
  const fs = require('fs');

  const resPath = path.join(__dirname, './TomTomResponse.json');
  const file = fs.readFileSync(resPath, 'utf-8');
  const response = await JSON.parse(file);
  console.log(response);
  return response;
};

exports.getDestinationInfo = async (_, args) => {
  const id = args.id;
  try {
    return await Locations.findById(id).exec();
  } catch (e) {
    console.error(e);
  }
};

exports.getUser = async (_, args) => {
  const id = args.id;
  try {
    const user = await Users.findById(id).populate('visited_locations').exec();
    return user;
  } catch (e) {
    console.error(e);
  }
};
