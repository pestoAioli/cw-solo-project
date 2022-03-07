import { request, gql, GraphQLClient } from 'graphql-request';

const apiURL = 'http://192.168.1.137:4000/';
const client = new GraphQLClient(apiURL);

export const getRoute = async (routeParams) => {
  const variables = { input: routeParams };

  const query = gql`
    query GetLocation($input: dirInput!) {
      getLocation(input: $input) {
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
              }
            }
          }
        }
      }
    }
  `;

  return await client.request(query, variables);
};
