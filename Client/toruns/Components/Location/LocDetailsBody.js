import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import * as col from '../../Styles/Colours';
import { tabBarHeight } from '../../Styles/Dimensions';

const LocDetailsBody = ({ dest }) => {
  return (
    <View style={{ paddingBottom: tabBarHeight }}>
      <Text style={styles.sectionTitle}>Stats:</Text>
      <View style={[styles.bodyContainer, styles.shadow]}>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Coordinates: </Text>
          <Text>{dest.coordinates.join(' , ')}</Text>
        </Text>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Altitude: </Text>
          <Text>{dest.altitude} m</Text>
        </Text>
        <Text style={styles.description}>
          <Text style={{ fontWeight: 'bold' }}>Tags: </Text>
          <Text>{dest.tags.join(' - ')}</Text>
        </Text>
      </View>
      <Text style={styles.sectionTitle}>Description:</Text>
      <View style={[styles.bodyContainer, styles.shadow]}>
        <Text style={styles.description}>{dest.description}</Text>
      </View>
    </View>
  );
};

export default LocDetailsBody;

const styles = StyleSheet.create({
  bodyContainer: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    backgroundColor: col.accent,
    marginHorizontal: 30,
  },
  sectionTitle: {
    marginTop: 20,
    marginLeft: 30,
    fontSize: 18,
    fontWeight: '500',
    color: col.highContrastReduced,
  },
  description: {
    fontSize: 15,
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
