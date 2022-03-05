import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as col from './../Styles/Colours';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: col.accentLight,
  },
  loadingText: {
    fontSize: 23,
    color: col.background,
  },
});
