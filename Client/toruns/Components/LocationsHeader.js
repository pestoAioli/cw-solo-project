// @ts-nocheck
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as col from './../Styles/Colours';
import { windowWidth, headerHeight } from './../Styles/Dimensions';

// Header with title and subtitle.
const LocationsHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Locations:</Text>
    </View>
  );
};

export default LocationsHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: headerHeight * 0.8,
    width: windowWidth,
    zIndex: 1,
    backgroundColor: col.accent,
    opacity: 0.95,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    color: col.highContrast,
    fontSize: 36,
  },
});
