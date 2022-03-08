import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';

import MainHeader from '../MainHeader';

import { getDestinationInfo } from '../../Services/APIService';
import * as col from '../../Styles/Colours';
import Loader from '../Loader';
import {
  headerHeight,
  tabBarHeight,
  windowWidth,
} from '../../Styles/Dimensions';
import LocDetailsBody from './LocDetailsBody';
import LocMap from './LocMap';

const LocationDetails = ({ route, navigation }) => {
  const [dest, setDest] = useState(null);

  useEffect(() => {
    const { destID } = route.params;
    getDestinationInfo(destID).then((resp) => setDest(resp.getDestinationInfo));
  }, []);

  return !dest ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      <MainHeader />
      <TouchableOpacity
        style={styles.testButton}
        onPress={() =>
          navigation.navigate('Profile', { screen: 'LocationsList' })
        }
      >
        <Text style={styles.testButtonText}>+</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <View style={[styles.titleContainer, styles.shadow]}>
          <Text style={styles.title}>{dest.name}</Text>
        </View>
        <View style={styles.shadow}>
          <LocMap dest={dest} />
        </View>
        <LocDetailsBody dest={dest} />
      </ScrollView>
    </View>
  );
};

export default LocationDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: col.accentLight,
    paddingTop: headerHeight,
  },
  titleContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: col.interactive,
    marginHorizontal: 30,
  },
  title: {
    color: col.highContrast,
    fontSize: 36,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  testButton: {
    position: 'absolute',
    left: windowWidth * 0.85,
    top: 50,
    zIndex: 5,
  },
  testButtonText: {
    fontSize: 30,
    color: col.highContrast,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});