// @ts-nocheck
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext } from 'react';

import round from './../../assets/icons/Nav_roundabout.png';
import roundArrow from './../../assets/icons/Nav_roundabout-arrow.png';
import RouteContext from '../../Context/routeContext';
import * as col from '../../Styles/Colours';

const NavRoundabout = ({ style }) => {
  const { currentRoute } = useContext(RouteContext);
  const { turnAngleInDecimalDegrees, roundaboutExitNumber } =
    currentRoute.nextInstruction;

  const turnAngle = turnAngleInDecimalDegrees
    ? turnAngleInDecimalDegrees + 'deg'
    : null;

  return (
    <View style={[style, styles.container]}>
      <Text style={styles.rountText}>{roundaboutExitNumber}</Text>
      <View style={styles.containerRound}>
        <Image source={round} style={styles.imgRound} resizeMode={'contain'} />
      </View>
      {turnAngle ? (
        <View style={styles.containerRound}>
          <Image
            source={roundArrow}
            style={styles.imgRound}
            transform={[{ rotate: turnAngle }]}
            resizeMode={'contain'}
          />
        </View>
      ) : null}
    </View>
  );
};

export default NavRoundabout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRound: {
    position: 'absolute',
    top: 0,
    left: '5%',
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rountText: {
    fontSize: 80,
    color: col.highContrast,
    fontFamily: 'Pridi_400Regular',
  },
  imgRound: {
    width: '140%',
    height: '140%',
  },
});
