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
