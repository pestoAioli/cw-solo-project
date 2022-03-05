import { request, gql, GraphQLClient } from 'graphql-request';

const apiURL = 'http://192.168.1.137:4000/';
const client = new GraphQLClient(apiURL);

export const getRoute = async (routeParams) => {
  const variables = { input: routeParams };

  const query = gql`
    query getLocation($input: dirInput!) {
      getLocation(input: $input) {
        id
        route {
          routes {
            summary {
              lengthInMeters
              travelTimeInSeconds
              arrivalTime
            }
            guidance {
              instructions {
                point {
                  latitude
                  longitude
                }
                street
                maneuver
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
