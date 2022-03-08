// @ts-nocheck
import { StyleSheet, View, Image } from 'react-native';
import React, { useContext } from 'react';

import turn from './../../assets/icons/Nav_turn.png';
import uTurn from './../../assets/icons/Nav_u-turn.png';
import follow from './../../assets/icons/Nav_follow.png';

import RouteContext from '../../Context/routeContext';
import NavRoundabout from './NavRoundabout';

const NavSymbol = ({ style }) => {
  const { currentRoute } = useContext(RouteContext);
  const { junctionType, maneuver } = currentRoute.nextInstruction;

  // If it is not time to show a symbol, returns null.
  const showSymbol =
    currentRoute.status === 'approaching' || currentRoute.status === 'maneuver';
  if (!showSymbol) return null;

  // Case Roundabout
  if (junctionType === 'ROUNDABOUT') {
    return <NavRoundabout style={style} />;
  }

  // If not, checks which type of turn is making (very basic).
  const isLeft = new RegExp('LEFT').test(maneuver);
  const isRight = new RegExp('RIGHT').test(maneuver);
  const isUTurn = new RegExp('UTURN').test(maneuver);
  const symbol = isLeft || isRight ? turn : isUTurn ? uTurn : follow;

  return (
    <View style={style}>
      <Image
        source={symbol}
        style={[styles.img, isLeft ? styles.imgLeft : null]}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default NavSymbol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '80%',
    height: '80%',
  },
  imgLeft: {
    transform: [{ scaleX: -1 }],
  },
});
