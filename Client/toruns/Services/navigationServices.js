// Initialises a route with the data given by the server.
// TODO: Move this logic to the server instead ??
export const initialiseRoute = (data, routeIndex) => {
  const status = 'loaded';
  const arrived = false;
  const destinationID = data.getRoute.id;
  const route = data.getRoute.route.routes[routeIndex];
  const summary = route.summary;
  const polyline = route.legs[0].points;
  const instructions = route.guidance.instructions;
  const nextIndex = 0;
  const nextCoords = instructions[nextIndex].point;
  const nextInstruction = instructions[nextIndex];

  return {
    destinationID,
    status,
    arrived,
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

  if (nextloc < 20) {
    updateNextPont(route.nextIndex + 1, route, setRoute);
    return;
  }

  if (nextloc < 500) {
    status = 'maneuver';
    statusText =
      nextloc < 50
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
      arrived: true,
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

export const formatRouteInfo = (seconds, meters) => {
  const formattedInfo = { time: '', distance: `${meters}m` };
  if (meters > 1000) formattedInfo.distance = `${(meters / 1000).toFixed(2)}Km`;

  let hours = Math.floor(seconds / 3600);
  let min = Math.floor(seconds / 60 - hours * 60);

  if (seconds < 60) formattedInfo.distance = '<1min';
  else {
    formattedInfo.time = hours ? `${hours}h ${min}min` : `${min}min`;
  }
  return formattedInfo;
};
