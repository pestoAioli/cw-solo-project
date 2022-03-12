import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

import MapStyle from '../Styles/MapStyle';
import * as col from '../Styles/Colours';
import { windowWidth, windowHeight } from '../Styles/Dimensions';
import { getCurrentLocation } from '../Services/locationServices';
import Loader from './Loader';

import RouteSetUp from '../Context/routeSetUp';

const SelectionMap = () => {
  const [region, setRegion] = useState(null);
  const [zoom, setZoom] = useState(9);
  const { routeParams, setRouteParams } = useContext(RouteSetUp);

  // Checks the user current location the first time the component is mounted.
  // Uses tsid value to set the map center, and the route origin.
  useEffect(() => {
    getCurrentLocation().then((loc) => {
      setRouteParams((params) => ({
        ...params,
        origin: [loc.coords.latitude, loc.coords.longitude],
      }));
      setRegion({
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  // Sets the maximum zoom level in order to always see the
  // entire range on the screen when moving the slider.
  useEffect(() => {
    const minZoom = 6.7;
    const maxZoom = 10;
    const minKm = 20;
    const maxKm = 200;
    const zoomRange = maxZoom - minZoom;
    const kmRange = maxKm - minKm;
    setZoom(maxZoom - ((routeParams.range - minKm) / kmRange) * zoomRange);
  }, [routeParams.range]);

  // Resets the maxZoom in order to enable zoom in once the region has been set.
  const resetZoom = () => {
    if (zoom < 15) setZoom(15);
  };

  return region ? (
    <MapView
      style={styles.map}
      initialRegion={region}
      minZoomLevel={5.5}
      maxZoomLevel={zoom}
      pitchEnabled={false}
      tintColor={col.highContrast}
      customMapStyle={MapStyle}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      onRegionChange={resetZoom}
    >
      <Circle
        center={region}
        radius={routeParams.range * 1000}
        strokeColor={col.accent}
        fillColor={col.accentLightTrans}
      />
    </MapView>
  ) : (
    <Loader />
  );
};

export default SelectionMap;

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height: windowHeight,
  },
});
