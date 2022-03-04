// @ts-nocheck
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { BlurView } from 'expo-blur';

import * as col from './../Styles/Colours';
import { windowWidth, windowHeight } from './../Styles/Dimensions';
import RouteRangeContext from './../Context/context';
import CircleButton from '../Components/CircleButton';
import TagButton from '../Components/TagButton';

import fastImg from './../assets/icons/highway.png';
import thrillImg from './../assets/icons/road.png';
import beach from './../assets/icons/beach.png';
import mountain from './../assets/icons/mountain.png';
import restaurant from './../assets/icons/restaurant.png';
import historical from './../assets/icons/moai.png';

const Preferences = ({ setRangeSelected, navigation }) => {
  const { preferences, setPreferences } = useContext(RouteRangeContext);

  const onDismiss = (e) => {
    setRangeSelected(false);
  };

  const onTag = (tag) => {
    setPreferences({
      ...preferences,
      filters: [tag],
    });
  };

  const onGo = (routeType) => {
    setPreferences({
      ...preferences,
      type: routeType,
    });
    navigation.navigate('Nav');
    setRangeSelected(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPressOut={onDismiss}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.selContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}> Select your main preference:</Text>
          </View>
          <View style={styles.filtersContainer}>
            <TagButton img={mountain} tag={'mountain'} onPress={onTag} />
            <TagButton img={beach} tag={'beach'} onPress={onTag} />
            <TagButton img={historical} tag={'historical'} onPress={onTag} />
            <TagButton img={restaurant} tag={'restaurant'} onPress={onTag} />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <CircleButton img={fastImg} routeType={'fastest'} onPress={onGo} />
          <CircleButton
            img={thrillImg}
            routeType={'thrilling'}
            onPress={onGo}
          />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selContainer: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.5,
    backgroundColor: col.accent,
    borderRadius: 30,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  filtersContainer: {
    flex: 4,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  text: {
    padding: 10,
    fontSize: 18,
    color: col.highContrast,
  },
  btnContainer: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
