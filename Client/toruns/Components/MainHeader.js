// @ts-nocheck
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as col from './../Styles/Colours';
import { windowWidth, headerHeight } from './../Styles/Dimensions';
import tournLogoGreen from '../assets/tournLogoGreen.png';

// Header with title and subtitle.

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
    height: headerHeight,
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
    color: col.background,
  },
  logo: {
    height: 50,
    width: windowWidth * 0.4,
  },
});
