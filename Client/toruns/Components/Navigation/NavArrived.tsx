import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';
import { BlurView } from 'expo-blur';
import * as col from '../../Styles/Colours';
import { windowHeight, windowWidth } from '../../Styles/Dimensions';
import TextButton from '../Buttons/TextButton';

import RouteContext from '../../Context/routeContext';
import { addVisitedDestination } from '../../Services/APIService';

const NavArrived = ({ navigation }) => {
  const { currentRoute, setCurrentRoute } = useContext(RouteContext);

  useEffect(() => {
    //For testing, later it should be via authentication;
    const userID = '622769314d76691f6f1ab550';
    const locationID = currentRoute.destinationID;
    addVisitedDestination(userID, locationID).catch(console.error);
  }, []);

  const showDetails = useCallback(() => {
    const destID = currentRoute.destinationID;
    setCurrentRoute(null);
    navigation.navigate('Profile', {
      screen: 'Details',
      params: { destID },
    });
  }, []);

  const dismiss = useCallback(() => {
    setCurrentRoute(null);
    navigation.navigate('Home');
  }, []);

  return (
    <BlurView intensity={60} style={styles.container}>
      <View style={styles.centralContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Congratulations!!</Text>
          <Text style={styles.subTitle}>
            You just discovered a new beautiful place!
          </Text>
        </View>
        <View style={styles.buttonsView}>
          <Text style={styles.subTitle}>Do you want to know more?</Text>
          <TextButton text={'Yes, sure!'} handleClick={showDetails} />
          <TextButton text={'No, thanks...'} handleClick={dismiss} />
        </View>
      </View>
    </BlurView>
  );
};

export default NavArrived;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralContainer: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    backgroundColor: col.accent,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  titleContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: col.accentLightTrans,
    paddingHorizontal: 15,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    fontSize: 36,
    color: col.highContrast,
    fontFamily: 'Signika_600SemiBold',
    marginBottom: 5,
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: col.highContrast,
    fontFamily: 'Signika_300Light',
    lineHeight: 26,
  },
  buttonsView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 30,
  },
});
