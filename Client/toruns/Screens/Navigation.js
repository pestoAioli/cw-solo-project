import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { getRoute } from '../Services/APIService';

import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from './../Components/Loader';

const Navigation = ({ navigation }) => {
  const { origin, range, preferences } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  useEffect(() => {
    const routeParams = {
      origin,
      range,
      ...preferences,
    };
    getRoute(routeParams).then((data) => {
      console.log(data.getLocation);
      setCurrentRoute(data);
    });
  }, [preferences.type]);

  return !currentRoute ? (
    <Loader />
  ) : (
    <View>
      <Text>Navigation</Text>
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
