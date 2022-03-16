// @ts-nocheck
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useContext, useCallback } from 'react';
import { BlurView } from 'expo-blur';

import * as col from '../Styles/Colours';
import { windowWidth, windowHeight } from '../Styles/Dimensions';
import RouteSetUp from '../Context/routeSetUp';
import CircleButton from '../Components/Buttons/CircleButton';
import TagButton from '../Components/Buttons/TagButton';

// Icons importation
import fastest from './../assets/icons/highway.png';
import thrilling from './../assets/icons/road.png';
import beach from './../assets/icons/beach.png';
import mountain from './../assets/icons/mountain.png';
import restaurant from './../assets/icons/restaurant.png';
import historical from './../assets/icons/moai.png';
import RadiusButton from '../Components/RadiusButton';
interface PreferencesProps {
  setPrefsModal: Function
  navigation: Object
}
const Preferences = ({ setPrefsModal, navigation }: PreferencesProps) => {
  const { routeParams, setRouteParams } = useContext(RouteSetUp);

  const tags = { mountain, beach, historical, restaurant };
  const types = { fastest, thrilling };

  const onDismiss = useCallback(() => {
    setPrefsModal(false);
  }, []);

  const onTag = useCallback(
    (tag) => {
      setRouteParams((params) => ({
        ...params,
        filters: [tag],
      }));
    },
    [routeParams.filters]
  );

  const onGo = useCallback(
    (routeType) => {
      setRouteParams((params) => ({
        ...params,
        type: routeType,
      }));
      navigation.navigate('Nav');
      setPrefsModal(false);
    },
    [routeParams.type]
  );

  return (
    <TouchableOpacity style={styles.container} onPressOut={onDismiss}>
      <BlurView intensity={60} style={styles.blurContainer}>
        <View style={styles.selContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.text}>
              {' '}
              Select your destination preference:
            </Text>
          </View>
          <View style={styles.filtersContainer}>
            {Object.keys(tags).map((key) => (
              <TagButton tag={key} img={tags[key]} onPress={onTag} key={key} />
            ))}
          </View>
          <View style={styles.radBtn}>
            <RadiusButton />
          </View>
        </View>
        <View style={styles.btnContainer}>
          {Object.keys(types).map((key) => (
            <CircleButton
              routeType={key}
              img={types[key]}
              onPress={onGo}
              key={key}
            />
          ))}
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
    backgroundColor: col.accentLightTrans,
  },
  text: {
    padding: 10,
    fontSize: 17,
    color: col.highContrast,
  },
  btnContainer: {
    width: windowWidth * 0.6,
    height: windowHeight * 0.15,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  radBtn: {
    flex: 1,
    width: 120,
  },
});
