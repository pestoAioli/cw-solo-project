// @ts-nocheck
'use strict';
const fetch = require('node-fetch');
const {
  getTomTomURL,
  getRandomDestination,
} = require('../../Helpers/routes');

const { Locations, Users } = require('../../Models');

exports.getRoute = async (_, args) => {
  const { origin, range, filters, type } = args.input;

  try {
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
    return await Users.findById(id).populate('visited_locations').exec();
  } catch (e) {
    console.error(e);
  }
};
