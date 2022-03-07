import React, { useContext, useEffect, useState } from 'react';
import { getRoute } from '../Services/APIService';

import { StyleSheet, View, Modal } from 'react-native';
import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from '../Components/Loader';
import NavReady from '../Components/NavReady';

import { initialiseRoute } from '../Services/navigationServices';
import NavArrived from '../Components/NavArrived';
import NavDirections from '../Components/NavDirections';

const Navigation = () => {
  const { routeParams } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    getRoute(routeParams).then((data) => {
      const routeIndex = 0; // If no alternative routes asked, leave to 0.
      setCurrentRoute(initialiseRoute(data, routeIndex));
    });
  }, []);

  useEffect(() => {
    if (currentRoute.status === 'arrived') setArrived(true);
  }, [currentRoute.status]);

  if (!currentRoute) return <Loader />;
  if (currentRoute.status === 'loaded') return <NavReady />;
  else
    return (
      <View style={styles.container}>
        <NavDirections />
        <Modal animationType="slide" transparent={true} visible={arrived}>
          <NavArrived />
        </Modal>
      </View>
    );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
