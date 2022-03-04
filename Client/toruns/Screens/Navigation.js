import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';

import RouteRangeContext from './../Context/context';

const Navigation = ({ navigation }) => {
  const { origin, range, preferences } = useContext(RouteRangeContext);

  useEffect(() => {
    const routeParams = {
      origin,
      range,
      ...preferences,
    };
    console.log(routeParams);
  }, [preferences]);

  return (
    <View>
      <Text>Navigation</Text>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
