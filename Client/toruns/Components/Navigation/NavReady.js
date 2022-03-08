import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useCallback } from 'react';

import MainHeader from './../MainHeader';
import * as col from '../../Styles/Colours';
import { headerHeight } from '../../Styles/Dimensions';
import RouteDetails from './RouteDetails';
import { updateNextPont } from '../../Services/navigationServices';

import RouteContext from '../../Context/routeContext';
import TextButton from './../Buttons/TextButton';

const NavReady = () => {
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  const handleClick = useCallback(() => {
    updateNextPont(1, currentRoute, setCurrentRoute);
    setCurrentRoute((route) => ({ ...route, status: 'follow' }));
  }, []);

  return (
    <View style={styles.container}>
      <MainHeader />
      <View style={[styles.titleContainer, styles.shadow]}>
        <Text style={styles.titleText}>Your route is ready !!</Text>
      </View>
      <RouteDetails />
      <TextButton text={'START'} handleClick={handleClick} />
    </View>
  );
};

export default NavReady;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: col.accentLight,
    paddingVertical: headerHeight + 30,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 36,
    color: col.highContrast,
    fontWeight: '500',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
});
