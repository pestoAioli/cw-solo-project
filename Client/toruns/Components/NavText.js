import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as col from '../Styles/Colours';
import { windowWidth, tabBarHeight } from '../Styles/Dimensions';

const NavText = ({ text }) => {
  let textToShow = text;
  if (typeof text === 'number') {
    textToShow = text < 1000 ? text + ' m' : (text / 1000).toFixed(2) + ' km';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{textToShow}</Text>
    </View>
  );
};

export default NavText;

const styles = StyleSheet.create({
  container: {
    height: tabBarHeight * 0.8,
    width: windowWidth * 0.7,
    backgroundColor: col.accent,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: col.highContrast,
    fontSize: 30,
    fontWeight: '500',
  },
});
