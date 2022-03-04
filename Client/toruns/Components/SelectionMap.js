import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Circle } from 'react-native-maps';

import MapStyle from '../Styles/MapStyle';
import * as col from './../Styles/Colours';
import { windowWidth, windowHeight } from './../Styles/Dimensions';
import { getCurrentLocation } from '../Services/locationServices';
import Loader from './Loader';

import RouteRangeContext from './../Context/context';

const SelectionMap = () => {
  const [region, setRegion] = useState(null);
  const { range, setOrigin } = useContext(RouteRangeContext);

  useEffect(() => {
    getCurrentLocation().then((loc) => {
      setOrigin([loc.coords.latitude, loc.coords.longitude]);
      setRegion({
        latitudeDelta: 0.8,
        longitudeDelta: 0.8,
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    });
  }, []);

  const onRegionChange = (newRegion) => {
    const { longitudeDelta, latitudeDelta } = newRegion;
    setRegion({
      ...region,
      latitudeDelta,
      longitudeDelta,
    });
  };

  return region ? (
    <MapView
      style={styles.map}
      region={region}
      customMapStyle={MapStyle}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      onRegionChangeComplete={onRegionChange}
    >
      <Circle
        center={region}
        radius={range * 1000}
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
