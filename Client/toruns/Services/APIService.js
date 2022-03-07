import { request, gql, GraphQLClient } from 'graphql-request';

const apiURL = 'https://c09d-45-130-134-153.ngrok.io';
const client = new GraphQLClient(apiURL);

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
