module.exports = `type Directions {
  formatVersion: String!
  routes: [Route!]
}

type Route {
  summary: Summary
  legs: [Legs]!
  sections: [Section]
}

type Summary {
  lengthInMeters: Int!
  travelTimeInSeconds: Int!
  trafficDelayInSeconds: Int
  trafficLengthInMeters: Int
  departureTime: String!
  arrivalTime: String!
}

type Legs {
  summary: Summary!
  points: [Point!]!
}

type Point {
  latitude: Float!
  longitude: Float!
}

type Section {
  startPointIndex: Int!
  endPointIndex: Int!
  sectionType: String!
  travelMode: String!
}

# Inputs
input dirInput {
  start: [Float!]!
  end: [Float!]!
}

# Queries:
type Query {
  getDirections(input: dirInput!): Directions!
}
`;
