// @ts-nocheck
import { StyleSheet, View } from 'react-native';
import React from 'react';

import * as col from '../Styles/Colours';
import BouncingPreloader from 'react-native-bouncing-preloaders';

import t from './../assets/logoLetters/t.png';
import o from './../assets/logoLetters/o.png';
import u from './../assets/logoLetters/u.png';
import r from './../assets/logoLetters/r.png';
import n from './../assets/logoLetters/n.png';
import { headerHeight } from '../Styles/Dimensions';

const Loader = () => {
  return (
    <View style={styles.container}>
      <BouncingPreloader
        icons={[t, o, u, r, n]}
        leftRotation="-680deg"
        rightRotation="360deg"
        leftDistance={-500}
        rightDistance={-500}
        speed={1500}
        size={50}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: headerHeight * 2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: col.accentLight,
  },
  loadingText: {
    fontSize: 23,
    color: col.background,
  },
});
