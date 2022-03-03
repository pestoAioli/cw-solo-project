// @ts-nocheck
"use strict";

// Creates a url to call the TomTom API
exports.getTomTomURL = (start, dest, type) => {
  const baseURL = "https://api.tomtom.com/routing/1/calculateRoute/";
  const coords = `${start[0]}%2C${start[1]}%3A${dest[0]}%2C${dest[1]}/json`;

  const url = new URL(baseURL + coords);
  let params = {
    instructionsType: "tagged",
    routeRepresentation: "polyline",
    computeTravelTimeFor: "all",
    routeType: type,
    traffic: true,
    avoid: "unpavedRoads",
  };
  const thrilling =
    type === "thrilling" ? { hilliness: "high", windingness: "normal" } : {};

  const token = { key: process.env.TOMTOM_API };
  params = Object.assign(params, thrilling, token);
  url.search = new URLSearchParams(params).toString();

  return url;
};
