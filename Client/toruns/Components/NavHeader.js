// @ts-nocheck
import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import RouteContext from '../Context/routeContext';

import { headerHeight, windowWidth } from './../Styles/Dimensions';
import * as col from './../Styles/Colours';
import { formatRouteInfo } from '../Services/navigationServices';

const NavHeader = ({}) => {
  // TODO: Calculate time and distance remaining with the total time, and the offset given by the API.

  const { currentRoute } = useContext(RouteContext);

  let distanceRemaining = 0;
  let timeRemaining = 0;

  if (currentRoute) {
    distanceRemaining =
      currentRoute.summary.lengthInMeters -
      currentRoute.nextInstruction.routeOffsetInMeters;
    timeRemaining =
      currentRoute.summary.travelTimeInSeconds -
      currentRoute.nextInstruction.travelTimeInSeconds;
  }

  const { time, distance } = formatRouteInfo(timeRemaining, distanceRemaining);
  return (
    <View style={styles.header}>
      <Text style={[styles.text, styles.title]}>Destination at:</Text>
      <Text style={[styles.text, styles.subTitle]}>
        {distance} | {time}
      </Text>
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: headerHeight,
    width: windowWidth,
    zIndex: 1,
    backgroundColor: col.accent,
    opacity: 0.95,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    color: col.highContrast,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 18,
  },
});
