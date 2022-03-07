import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';

import * as col from '../Styles/Colours';
import { windowWidth } from '../Styles/Dimensions';

import RouteContext from '../Context/routeContext';

const NavManeuver = () => {
  const { currentRoute } = useContext(RouteContext);
  const { street, signPost, roadNums } = currentRoute.nextInstruction;

  const isManeuvering = currentRoute.status === 'maneuver';

  return isManeuvering && (street || signPost || roadNums) ? (
    <View style={styles.container}>
      {street ? <Text style={styles.text}>{street}</Text> : null}
      {signPost ? <Text style={styles.text}>{signPost}</Text> : null}
      {roadNums ? (
        <View style={styles.roadNums}>
          <Text style={styles.text}>{roadNums.join(' | ')}</Text>
        </View>
      ) : null}
    </View>
  ) : null;
};

export default NavManeuver;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    backgroundColor: col.interactiveLight,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    color: col.highContrast,
    fontSize: 24,
    fontWeight: '500',
    margin: 5,
  },
  roadNums: {
    flexDirection: 'row',
    backgroundColor: col.interactive,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});
