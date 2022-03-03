// @ts-nocheck
"use strict";
const fetch = require("node-fetch");
const { getTomTomURL } = require("./../../Helpers/routes");

exports.getLocation = async (_, args) => {
  const { start, range, filters, type } = args.input;

  // TODO: call a helper function with a starting point, range and filters to get a destination (id + location);
  const dest = { id: "1234", location: [41.423, 2.119] };

  const url = getTomTomURL(start, dest.location, type);

  try {
    const result = await fetch(url);
    const route = await result.json();
    return { id: dest.id, route };
  } catch (e) {
    throw e;
  }
};
