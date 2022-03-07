// Initialises a route with the data given by the server.
// TODO: Move this logic to the server instead ??
export const initialiseRoute = (data, routeIndex) => {
  const status = 'stopped';
  const destinationID = data.getLocation.id;
  const route = data.getLocation.route.routes[routeIndex];
  const summary = route.summary;
  const polyline = route.legs[0].points;
  const instructions = route.guidance.instructions;
  const nextIndex = 1;
  const nextCoords = instructions[nextIndex].point;
  const nextInstruction = instructions[nextIndex];

  return {
    destinationID,
    status,
    summary,
    polyline,
    instructions,
    nextIndex,
    nextCoords,
    nextInstruction,
  };
};

// It updates the status of the route according to the distance remaining
// to the next point. It can have three states:
//         -> Follow: More than 2km remaining.
//         -> Approaching: Between 500m and 2km.
//         -> Maneuver: Less than 500m.
// When it is at less than 30m, it triggers the next point.
export const updateRouteStatus = (nextloc, route, setRoute) => {
  let status = 'follow';
  let statusText = 'Continue...';

  if (nextloc < 30) updateNextPont(route.nextIndex + 1, route, setRoute);
  else if (nextloc < 500) {
    status = 'maneuver';
    statusText =
      nextloc < 80
        ? route.nextInstruction.maneuver.replace('_', ' ').toLowerCase()
        : (statusText = nextloc);
  } else if (nextloc < 2000) {
    status = 'approaching';
    statusText = nextloc;
  }

  setRoute((lastRoute) => ({
    ...lastRoute,
    statusText,
    status,
  }));
};

// Function triggered when a new instruction point is reached.
// If there are more intructions, it sets the next one.
// Otherwise, it changes the status to 'Arrived'
export const updateNextPont = (pointIndex, route, setRoute) => {
  if (pointIndex >= route.instructions.length) {
    console.log("You've arrived");
    setRoute((route) => ({
      ...route,
      status: 'arrived',
      statusText: 'Arrived',
    }));
  } else {
    setRoute((route) => ({
      ...route,
      nextIndex: pointIndex,
      nextCoords: route.instructions[pointIndex].point,
      nextInstruction: route.instructions[pointIndex],
    }));
  }
};
