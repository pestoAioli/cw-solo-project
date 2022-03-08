import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import * as col from '../../Styles/Colours';
import { windowWidth } from '../../Styles/Dimensions';

import Loader from '../Loader';

import RouteContext from '../../Context/routeContext';
import { formatRouteInfo } from '../../Services/navigationServices';
import { getBasicDestinationInfo } from '../../Services/APIService';

const RouteDetails = () => {
  const { currentRoute } = useContext(RouteContext);
  const { time, distance } = formatRouteInfo(
    currentRoute.summary.travelTimeInSeconds,
    currentRoute.summary.lengthInMeters
  );
  const [dest, setDest] = useState(null);

  useEffect(() => {
    getBasicDestinationInfo(currentRoute.destinationID).then((resp) =>
      setDest(resp.getDestinationInfo)
    );
  }, []);

  const firstStep = currentRoute.nextInstruction.message
    ? currentRoute.nextInstruction.message.replace(/\s*\<.*?\>\s*/g, ' ')
    : '';

  return dest ? (
    <View style={[styles.routeContiner, styles.shadow]}>
      <Text style={styles.routeTitleText}>Route details:</Text>
      <Text style={styles.routeText}>
        {time} | {distance}
      </Text>
      <Text style={styles.routeText}>Elevation: {dest.altitude}m</Text>
      <Text style={styles.routeText}>Tags: {dest.tags.join(' | ')}</Text>
      {currentRoute.nextInstruction.message ? (
        <View style={styles.nextStepContainer}>
          <Text style={styles.routeTitleText}>First Step:</Text>
          <Text style={styles.routeText}>{firstStep}</Text>
        </View>
      ) : null}
    </View>
  ) : (
    <Loader />
  );
};

export default RouteDetails;

const styles = StyleSheet.create({
  routeContiner: {
    backgroundColor: col.highContrastReduced,
    borderRadius: 10,
    width: windowWidth * 0.8,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  nextStepContainer: {
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeText: {
    fontSize: 20,
    color: col.lowContrast,
    textAlign: 'center',
  },
  routeTitleText: {
    marginVertical: 5,
    fontSize: 22,
    color: col.background,
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
