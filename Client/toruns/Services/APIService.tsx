import { request, gql, GraphQLClient } from 'graphql-request';

// const apiURL = 'http://591d5de3-c2fd-431c-9a03-c576683e810a.clouding.host/';
const apiURL = 'http://localhost:4000';
const client = new GraphQLClient(apiURL);

export const addVisitedDestination = async (
  userId: string,
  locationId: string
) => {
  const mutation = gql`
    mutation Mutation($userId: String!, $locationId: String!) {
      addVisitedDestination(userID: $userId, locationID: $locationId)
    }
  `;
  return await client.request(mutation, { userId, locationId });
};

export const getUserInfo = async (id: string) => {
  const query = gql`
    query GetUser($id: String!) {
      getUser(id: $id) {
        name
        email
        visited_locations {
          _id
          name
        }
      }
    }
  `;
  const user = await client.request(query, { id });
  return user.getUser;
};

export const getBasicDestinationInfo = async (id: string) => {
  const query = gql`
    query GetDestinationInfo($id: String!) {
      getDestinationInfo(id: $id) {
        altitude
        tags
      }
    }
  `;
  const dest = await client.request(query, { id });
  return dest.getDestinationInfo;
};

export const getDestinationInfo = async (id: string) => {
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
  const dest = await client.request(query, { id });
  return dest.getDestinationInfo;
};

export const getRoute = async (routeParams: object) => {
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
  const route = await client.request(query, variables);
  return route.getRoute;
};
