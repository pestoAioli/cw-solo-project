import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useState, useEffect } from 'react';
import MapStyle from '../Styles/MapStyle';
import * as Location from 'expo-location';

const RangeSelection = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('no permissions');
        return;
      }

      // First tries to get the last known position, and if it doesn't find one, it gets it again.
      let lastPos = await Location.getLastKnownPositionAsync({});
      if (lastPos) setLocation(lastPos);
      else {
        let curLoc = await Location.getCurrentPositionAsync({});
        setLocation(curLoc);
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      setmapRegion({
        ...mapRegion,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      console.log(mapRegion);
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        customMapStyle={MapStyle}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      ></MapView>
    </View>
  );
};

export default RangeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
