import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';

import MainHeader from './MainHeader';
import RouteContext from '../Context/routeContext';
import { getDestinationInfo } from '../Services/APIService';
import * as col from '../Styles/Colours';

const NavArrived = () => {
  const [dest, setDest] = useState(null);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  useEffect(() => {
    getDestinationInfo(currentRoute.destinationID).then((resp) =>
      setDest(resp.getDestinationInfo)
    );
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader />
      <Text>Arrived !!</Text>
    </View>
  );
};

export default NavArrived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: col.accentLight,
  },
});
