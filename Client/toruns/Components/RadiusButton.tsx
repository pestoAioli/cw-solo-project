import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import * as col from '../Styles/Colours';

import RouteSetUp from '../Context/routeSetUp';

const RadiusButton = () => {
  const { routeParams } = useContext(RouteSetUp);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Range: {routeParams.range}Km</Text>
    </View>
  );
};

export default RadiusButton;

const styles = StyleSheet.create({
  container: {
    opacity: 0.9,
    height: 40,
    width: '100%',
    borderRadius: 30,
    backgroundColor: col.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: col.highContrast,
    fontFamily: 'Signika_300Light',
  },
});
