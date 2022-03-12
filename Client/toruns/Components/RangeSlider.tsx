import { StyleSheet, View } from 'react-native';
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { Slider } from 'react-native-elements';
import * as col from '../Styles/Colours';
import { windowWidth, windowHeight } from '../Styles/Dimensions';

import RouteSetUp from '../Context/routeSetUp';

// Creates a slider to set the km range of the route.
const RangeSlider = () => {
  const { routeParams, setRouteParams } = useContext(RouteSetUp);
  const [value, setValue] = useState(routeParams.range * 1000);

  useEffect(() => {
    setValue(routeParams.range * 1000);
  }, [routeParams.range]);

  const handleSliderChange = useCallback(
    (val) => {
      setRouteParams((prefs) => ({ ...prefs, range: val / 1000 }));
    },
    [routeParams.range]
  );

  return (
    <View style={styles.sliderContainer}>
      <Slider
        value={value}
        onValueChange={handleSliderChange}
        maximumValue={200000}
        minimumValue={20000}
        step={10000}
        allowTouchTrack
        maximumTrackTintColor={col.lowContrast}
        minimumTrackTintColor={col.highContrast}
        trackStyle={styles.track}
        thumbStyle={styles.thumb}
      />
    </View>
  );
};

export default RangeSlider;

const styles = StyleSheet.create({
  sliderContainer: {
    position: 'absolute',
    zIndex: 3,
    top: windowHeight * 0.815,
    left: windowWidth * 0.1,
    height: 50,
    width: windowWidth * 0.8,
    justifyContent: 'center',
  },
  track: {
    height: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: col.accent,
  },
});
