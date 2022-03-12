import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getDestinationInfo } from '../../Services/APIService';
import * as col from '../../Styles/Colours';
import Loader from '../Loader';
import LocDetailsBody from './LocDetailsBody';
import LocMap from './LocMap';

const LocationDetails = ({ route, navigation }) => {
  const [dest, setDest] = useState(null);

  useEffect(() => {
    const { destID } = route.params;
    getDestinationInfo(destID).then(setDest);
  }, [route.params]);

  return !dest ? (
    <Loader />
  ) : (
    <View style={styles.container}>
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
    fontSize: 33,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontFamily: 'Signika_600SemiBold',
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
