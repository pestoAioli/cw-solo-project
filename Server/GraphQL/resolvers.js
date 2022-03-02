const request = require('request-promise-native');

module.exports = {
  Query: {
    async getDirections(_, args) {

      const input = args.input;
      const opts = { resolveWithFullResponse: true };

      const baseURL = 'https://api.tomtom.com/routing/1/calculateRoute/'
      const route = `${input.start[0]}%2C${input.start[1]}%3A${input.end[0]}%2C${input.end[1]}`
      const endURL = '/json?maxAlternatives=2&instructionsType=coded&routeRepresentation=polyline&routeType=thrilling&traffic=true&avoid=unpavedRoads&travelMode=car&hilliness=high&windingness=normal&key=' + process.env.TOMTOM_API;
      const url = baseURL + route + endURL;

      const result = await request(url, opts);
      return JSON.parse(result.body);
    }
  }
}