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
    const dest = await getRandomDestination(origin, range, filters);
    if (!dest) throw e;

    const url = getTomTomURL(origin, dest.coordinates, type);
    const result = await fetch(url);
    const route = await result.json();

    return { id: dest.id, route };
  } catch (e) {
    console.error(e);
    return { id: 'error', route: [] };
  }
};
