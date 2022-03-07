import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { getRoute } from '../Services/APIService';
import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { BlurView } from 'expo-blur';

import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from './../Components/Loader';
import NavText from '../Components/NavText';
import NavManeuver from '../Components/NavManeuver';
import NavHeader from './../Components/NavHeader';

import * as col from './../Styles/Colours';
import { tabBarHeight, windowHeight, windowWidth } from '../Styles/Dimensions';
import NavMapStyle from './../Styles/NavMapStyle';

import { calculateDistance } from '../Services/locationServices';
import NavSymbol from '../Components/NavSymbol';

//! I'm currently working on separating this file into smaller components.

const Navigation = ({ navigation }) => {
  const { routeParams } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  const [currentLocation, setCurrentLocation] = useState(null);
  const [region, setRegion] = useState(null);

  const [dist, setDist] = useState(2100);

  useEffect(() => {
    getRoute(routeParams).then((data) => {
      setCurrentRoute({
        status: 'follow',
        summary: data.getLocation.route.routes[0].summary,
        destination: data.getLocation.id,
        polyline: data.getLocation.route.routes[0].legs[0].points,
        instructions: data.getLocation.route.routes[0].guidance.instructions,
        nextPoint: 1,
      });
    });
    Location.watchPositionAsync({ distanceInterval: 1 }, (loc) =>
      setCurrentLocation(loc.coords)
    );
  }, []);

  const addDistance = useCallback(() => {
    setDist((curDist) => curDist - 50);
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
        if (nextLocationAt < 30) {
          setCurrentRoute((route) => ({
            ...route,
            nextPoint: route.nextPoint + 1,
            statusText: 'Continue',
          }));
          const isArrived = new RegExp('ARRIVE');
          if (
            isArrived.test(
              currentRoute.instructions[currentRoute.nextPoint].maneuver
            )
          ) {
            console.log("You've arrived");
            setCurrentRoute((route) => ({
              ...route,
              status: 'arrived',
              statusText: 'Arrived',
            }));
          }
          setDist(2500);
        } else if (nextLocationAt < 80) {
          setCurrentRoute((route) => ({
            ...route,
            nextLocationAt,
            statusText: currentRoute.instructions[
              currentRoute.nextPoint
            ].maneuver
              .replace('_', ' ')
              .toLowerCase(),
          }));
        } else if (nextLocationAt < 500) {
          setCurrentRoute((route) => ({
            ...route,
            nextLocationAt,
            status: 'maneuver',
            statusText: route.nextLocationAt,
          }));
        } else if (nextLocationAt < 2000) {
          setCurrentRoute((route) => ({
            ...route,
            nextLocationAt,
            status: 'approaching',
            statusText: route.nextLocationAt,
          }));
        } else {
          setCurrentRoute((route) => ({
            ...route,
            nextLocationAt,
            status: 'follow',
            statusText: 'Continue',
          }));
        }
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
      <MapView
        style={styles.map}
        region={region}
        zoomEnabled={false}
        pitchEnabled={false}
        showsBuildings={true}
        tintColor={col.highContrast}
        customMapStyle={NavMapStyle}
        provider={PROVIDER_GOOGLE}
      >
        <Polyline
          coordinates={currentRoute.polyline}
          strokeColor={col.highContrastReduced}
          strokeWidth={60}
          lineCap={'round'}
          lineJoin={'round'}
        />
      </MapView>
      <BlurView intensity={60} style={styles.blurContainer} tint="light">
        <NavHeader />
        {currentRoute.status === 'maneuver' ? (
          <NavManeuver
            street={currentRoute.instructions[currentRoute.nextPoint].street}
            signPost={
              currentRoute.instructions[currentRoute.nextPoint].signpostText
            }
            roadNums={
              currentRoute.instructions[currentRoute.nextPoint].roadNumbers
            }
          />
        ) : null}
        {currentRoute.status !== 'follow' ? (
          <View style={styles.symbol}>
            <NavSymbol
              instruction={currentRoute.instructions[currentRoute.nextPoint]}
            />
          </View>
        ) : null}

        {currentRoute.statusText ? (
          <NavText text={currentRoute.statusText} />
        ) : null}
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
    paddingVertical: tabBarHeight,
  },
  map: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowWidth,
    height: windowHeight,
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
    minHeight: windowHeight * 0.4,
    width: windowWidth,
    marginVertical: 10,
  },
});
