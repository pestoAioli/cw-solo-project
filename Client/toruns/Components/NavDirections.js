import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useCallback, useEffect } from 'react';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';

import RouteContext from '../Context/routeContext';

import NavText from '../Components/NavText';
import NavManeuver from '../Components/NavManeuver';
import NavHeader from './../Components/NavHeader';
import NavSymbol from '../Components/NavSymbol';
import NavMap from '../Components/NavMap';

import * as col from './../Styles/Colours';
import { updateRouteStatus } from '../Services/navigationServices';
import { tabBarHeight, windowWidth } from '../Styles/Dimensions';

const NavDirections = () => {
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const [dist, setDist] = useState(31); // Testing indoors

  useEffect(() => {
    let subscription;
    Location.watchPositionAsync({ distanceInterval: 1 }, (loc) => {
      setCurrentLocation(loc.coords);
    }).then((res) => (subscription = res));
    return () => subscription.remove();
  }, []);

  // Called each time a new location is detected
  useEffect(() => {
    if (currentLocation) {
      setRegion({
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });

      if (currentRoute) {
        // REAL
        // const nextLocationAt = Math.round(
        //   calculateDistance(currentLocation, currentRoute.nextCoords)
        // );

        // TESTS INDOOR
        const nextLocationAt = dist;
        // BOTH REAL AND TESTS.
        updateRouteStatus(nextLocationAt, currentRoute, setCurrentRoute);

        // Only for tests
        setDist(20);
      }
    }
  }, [dist]);

  // Used for testing indoors:
  const addDistance = useCallback(() => {
    setDist((curDist) => curDist - 1);
  }, [dist]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.testButton} onPress={addDistance}>
        <Text style={styles.testButtonText}>+</Text>
      </TouchableOpacity>
      <NavMap region={region} polyline={currentRoute.polyline} />
      <BlurView intensity={60} style={styles.blurContainer} tint="light">
        <NavHeader />
        <NavManeuver />
        <NavSymbol style={styles.symbol} />
        <NavText />
      </BlurView>
    </View>
  );
};

export default NavDirections;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: tabBarHeight + 20,
  },
  testButton: {
    position: 'absolute',
    left: windowWidth * 0.85,
    top: 50,
    zIndex: 5,
  },
  testButtonText: {
    fontSize: 30,
    color: col.highContrast,
  },
  symbol: {
    flex: 1,
    height: '80%',
    width: windowWidth * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
