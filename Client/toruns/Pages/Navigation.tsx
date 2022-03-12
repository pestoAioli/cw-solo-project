import React, { useContext, useCallback } from 'react';
import { getRoute } from '../Services/APIService';
import { useFocusEffect } from '@react-navigation/native';

import { StyleSheet, View, Modal } from 'react-native';
import RouteSetUpContext from '../Context/routeSetUp';
import RouteContext from '../Context/routeContext';
import Loader from '../Components/Loader';
import NavReady from '../Components/Navigation/NavReady';

import { initialiseRoute } from '../Services/navigationServices';
import NavArrived from '../Components/Navigation/NavArrived';
import NavDirections from '../Components/Navigation/NavDirections';

const Navigation = ({ navigation }) => {
  const { routeParams } = useContext(RouteSetUpContext);
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  // Called when the screen is focused.
  // If there isn't a current route running, it sets a new one.
  useFocusEffect(
    useCallback(() => {
      if (!currentRoute) {
        getRoute(routeParams).then((data) => {
          const routeIndex = 0; // If no alternative routes asked, leave to 0.
          setCurrentRoute(initialiseRoute(data, routeIndex));
        });
      }
    }, [currentRoute])
  );

  if (!currentRoute) return <Loader />;
  if (currentRoute.status === 'loaded') return <NavReady />;
  else
    return (
      <View style={styles.container}>
        <NavDirections />
        <Modal
          animationType="slide"
          transparent={true}
          visible={currentRoute.arrived}
        >
          <NavArrived navigation={navigation} />
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
