// @ts-nocheck
import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import turn from './../assets/icons/Nav_turn.png';
import uTurn from './../assets/icons/Nav_u-turn.png';
import round from './../assets/icons/Nav_roundabout.png';
import roundArrow from './../assets/icons/Nav_roundabout-arrow.png';
import follow from './../assets/icons/Nav_follow.png';

import * as col from './../Styles/Colours';

const NavSymbol = ({ instruction }) => {
  const {
    junctionType,
    maneuver,
    turnAngleInDecimalDegrees,
    roundaboutExitNumber,
  } = instruction;

  const turnAngle = turnAngleInDecimalDegrees
    ? turnAngleInDecimalDegrees + 'deg'
    : null;

  const isLeft = new RegExp('LEFT');
  const isRight = new RegExp('RIGHT');
  const isUTurn = new RegExp('UTURN');

  if (junctionType === 'ROUNDABOUT') {
    return (
      <View style={styles.container}>
        <Text style={styles.rountText}>{roundaboutExitNumber}</Text>
        <View style={styles.containerRound}>
          <Image
            source={round}
            style={styles.imgRound}
            resizeMode={'contain'}
          />
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
  }

  if (isLeft.test(maneuver) || isRight.test(maneuver)) {
    return (
      <View style={styles.container}>
        <Image
          source={turn}
          style={[styles.img, isLeft.test(maneuver) ? styles.imgLeft : null]}
          resizeMode={'contain'}
        />
      </View>
    );
  }

  if (isUTurn.test(maneuver)) {
    return (
      <View style={styles.container}>
        <Image source={uTurn} style={styles.img} resizeMode={'contain'} />
      </View>
    );
  }

  if (maneuver === 'FOLLOW' || maneuver === 'STRAIGHT') {
    return (
      <View style={styles.container}>
        <Image source={follow} style={styles.img} resizeMode={'contain'} />
      </View>
    );
  }

  return null;
};

export default NavSymbol;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerRound: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rountText: {
    fontSize: 80,
    color: col.highContrast,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  imgLeft: {
    transform: [{ scaleX: -1 }],
  },
  imgRound: {
    width: '140%',
    height: '140%',
  },
});
