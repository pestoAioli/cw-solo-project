import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import RouteRangeContext from './../Context/context';

const Navigation = ({ navigation }) => {
  const { origin, range } = useContext(RouteRangeContext);

  return (
    <View>
      <Text>Navigation</Text>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
