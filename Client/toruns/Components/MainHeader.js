// @ts-nocheck
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';

import * as col from './../Styles/Colours';
import { windowWidth, windowHeight } from './../Styles/Dimensions';
import tournLogoGreen from '../assets/tournLogoGreen.png';

const MainHeader = () => {
  return (
    <View style={styles.header}>
      <Image
        source={tournLogoGreen}
        style={styles.logo}
        resizeMode={'contain'}
      />
      <Text style={styles.text}>Where your adventure starts!</Text>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: windowHeight * 0.13,
    width: windowWidth,
    zIndex: 1,
    backgroundColor: col.accent,
    opacity: 0.95,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    color: col.background,
  },
  logo: {
    height: 50,
    width: windowWidth * 0.4,
  },
});
