import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import * as col from './../Styles/Colours';

// Creates a rounded button, with a given image, onPress callback, and a type of route.
// The type of route is a string that will be passed to the callback.

const CircleButton = ({ img, onPress, routeType }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(routeType)}
    >
      <Image source={img} style={styles.img} resizeMode={'contain'} />
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: 90,
    backgroundColor: col.interactiveLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  img: {
    height: '60%',
    width: '60%',
  },
});
