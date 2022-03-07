import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { getRoute } from '../Services/APIService';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';

import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from './../Components/Loader';
import NavText from '../Components/NavText';
import NavManeuver from '../Components/NavManeuver';
import NavHeader from './../Components/NavHeader';
import NavSymbol from '../Components/NavSymbol';
import NavMap from '../Components/NavMap';

import * as col from './../Styles/Colours';
import {
  updateRouteStatus,
  initialiseRoute,
} from '../Services/navigationServices';
import { tabBarHeight, windowWidth } from '../Styles/Dimensions';

import { calculateDistance } from '../Services/locationServices';

const Navigation = ({ navigation }) => {
  const { routeParams } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const [dist, setDist] = useState(31);

  useEffect(() => {
    getRoute(routeParams).then((data) => {
      const routeIndex = 0; // If no alternative routes asked, leave to 0.
      setCurrentRoute(initialiseRoute(data, routeIndex));
    });
    Location.watchPositionAsync({ distanceInterval: 1 }, (loc) => {
      setCurrentLocation(loc.coords);
    });
  }, []);

  const addDistance = useCallback(() => {
    setDist((curDist) => curDist - 1);
  }, [dist]);

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
        //   const nextPoint =
        //     currentRoute.instructions[currentRoute.nextPoint].point;
        //   const nextLocationAt = Math.round(
        //     calculateDistance(currentLocation, nextPoint)
        //   );
        const nextLocationAt = dist;
        updateRouteStatus(nextLocationAt, currentRoute, setCurrentRoute);
        setDist(30);
      }
    }
  }, [dist]);

  return !currentRoute ? (
    <Loader />
  ) : (
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

export default Navigation;

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
    left: 350,
    top: 30,
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
