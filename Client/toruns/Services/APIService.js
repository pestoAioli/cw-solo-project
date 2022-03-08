import { request, gql, GraphQLClient } from 'graphql-request';

const apiURL = 'http://591d5de3-c2fd-431c-9a03-c576683e810a.clouding.host/';
//const apiURL = 'http://localhost:4000';
const client = new GraphQLClient(apiURL);

export const addVisitedDestination = async (userId, locationId) => {
  const mutation = gql`
    mutation Mutation($userId: String!, $locationId: String!) {
      addVisitedDestination(userID: $userId, locationID: $locationId)
    }
  `;
  return await client.request(mutation, { userId, locationId });
};

export const getBasicDestinationInfo = async (id) => {
  const query = gql`
    query GetDestinationInfo($id: String!) {
      getDestinationInfo(id: $id) {
        altitude
        tags
      }
    }
  `;
  return await client.request(query, { id });
};

export const getDestinationInfo = async (id) => {
  const query = gql`
    query GetDestinationInfo($id: String!) {
      getDestinationInfo(id: $id) {
        altitude
        tags
        coordinates
        name
        description
      }
    }
  `;
  return await client.request(query, { id });
};

export const getRoute = async (routeParams) => {
  const variables = { input: routeParams };

  const query = gql`
    query GetRoute($input: dirInput!) {
      getRoute(input: $input) {
        id
        route {
          routes {
            summary {
              lengthInMeters
              travelTimeInSeconds
              arrivalTime
            }
            legs {
              points {
                latitude
                longitude
              }
            }
            guidance {
              instructions {
                point {
                  latitude
                  longitude
                }
                street
                maneuver
                signpostText
                roadNumbers
                roundaboutExitNumber
                junctionType
                travelTimeInSeconds
                routeOffsetInMeters
                turnAngleInDecimalDegrees
                message
              }
            }
          }
        }
      }
    }
  `;

  return await client.request(query, variables);
};
