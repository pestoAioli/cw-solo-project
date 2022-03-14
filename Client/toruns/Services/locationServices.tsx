import * as Location from 'expo-location';

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('no permissions');
    return;
  }

  // First tries to get the last known position, and if it doesn't find one, it gets it again.
  let loc = await Location.getLastKnownPositionAsync({});
  if (!loc) loc = await Location.getCurrentPositionAsync({});
  return loc;
};

export const calculateDistance = (loc, nextPoint) => {
  var radlat1 = (Math.PI * loc.latitude) / 180;
  var radlat2 = (Math.PI * nextPoint.latitude) / 180;
  var theta = loc.longitude - nextPoint.longitude;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist *= 1609.344; // To meters
  return dist;
};
