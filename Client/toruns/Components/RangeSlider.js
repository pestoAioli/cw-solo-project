import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { Slider } from 'react-native-elements';
import * as col from './../Styles/Colours';
import { windowWidth, windowHeight } from '../Styles/Dimensions';

import RouteRangeContext from './../Context/context';

const RangeSlider = () => {
  const { range, setRange } = useContext(RouteRangeContext);
  const handleSliderChange = (val) => {
    setRange(val);
  };

  return (
    <View style={styles.sliderContainer}>
      <Slider
        value={range}
        onValueChange={handleSliderChange}
        maximumValue={300}
        minimumValue={20}
        step={5000}
        allowTouchTrack
        trackStyle={{
          height: 10,
          backgroundColor: 'transparent',
        }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: col.accent }}
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
});
