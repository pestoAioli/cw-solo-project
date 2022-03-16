import { StyleSheet } from 'react-native';
import React from 'react';
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  LatLng,
  Region,
} from 'react-native-maps';

import * as col from '../../Styles/Colours';
import { windowHeight, windowWidth } from '../../Styles/Dimensions';
import NavMapStyle from '../../Styles/NavMapStyle';

interface NavMapProps {
  region: Region;
  polyline: LatLng[];
}

const NavMap = ({ region, polyline }: NavMapProps) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      zoomEnabled={false}
      pitchEnabled={false}
      showsBuildings={true}
      tintColor={col.highContrast}
      customMapStyle={NavMapStyle}
      provider={PROVIDER_GOOGLE}
    >
      <Polyline
        coordinates={polyline}
        strokeColor={col.highContrastReduced}
        strokeWidth={60}
        lineCap={'round'}
        lineJoin={'round'}
      />
    </MapView>
  );
};

export default NavMap;

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: windowWidth,
    height: windowHeight,
  },
});
