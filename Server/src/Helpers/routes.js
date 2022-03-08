// @ts-nocheck
'use strict';
const { Locations } = require('./../Models');

// Creates a url to call the TomTom API
const getTomTomURL = (start, dest, type) => {
  const baseURL = 'https://api.tomtom.com/routing/1/calculateRoute/';
  const coords = `${start[0]}%2C${start[1]}%3A${dest[0]}%2C${dest[1]}/json`;

  const url = new URL(baseURL + coords);
  let params = {
    instructionsType: 'tagged',
    routeRepresentation: 'polyline',
    computeTravelTimeFor: 'all',
    routeType: type,
    traffic: true,
    avoid: 'unpavedRoads',
  };
  const thrilling =
    type === 'thrilling' ? { hilliness: 'high', windingness: 'normal' } : {};

  const token = { key: process.env.TOMTOM_API };
  params = Object.assign(params, thrilling, token);
  url.search = new URLSearchParams(params).toString();

  return url;
};

// Credit to ParkPal (Guillem, Nelson, Viktor, and Brandon)
// Original source: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
const filterByDistance = (origin, dest, range) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(dest[0] - origin[0]);
  const dLon = deg2rad(dest[1] - origin[1]);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(origin[0])) *
      Math.cos(deg2rad(dest[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d < range;
};

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const getRandomDestination = async (origin, range, filters) => {
  // TODO: Make the filter at the db, and just receive locations that match filters.
  const allLocations = await Locations.find().exec();
  if (allLocations.length === 0) throw new Error();

  const filteredLocs = allLocations.filter((loc) =>
    filterByDistance(origin, loc.coordinates, range) && filters.length > 0
      ? loc.tags.includes(filters[0])
      : true
  );

  const nResults = filteredLocs.length;
  const idx = nResults > 1 ? Math.floor(Math.random() * (nResults + 1)) : 0;
  return filteredLocs[idx];
};

module.exports = { getTomTomURL, getRandomDestination };
