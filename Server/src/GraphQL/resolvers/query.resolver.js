// @ts-nocheck
'use strict';
const fetch = require('node-fetch');
const {
  getTomTomURL,
  getRandomDestination,
} = require('./../../Helpers/routes');

exports.getLocation = async (_, args) => {
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
exports.getFakeLocation = async () => {
  const path = require('path');
  const fs = require('fs');

  const resPath = path.join(__dirname, './TomTomResponse.json');
  const file = fs.readFileSync(resPath, 'utf-8');
  const response = await JSON.parse(file);
  console.log(response);
  return response;
};
