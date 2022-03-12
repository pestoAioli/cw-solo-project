import { StyleSheet, View, Modal } from 'react-native';
import React from 'react';

import SelectionMap from '../Components/SelectionMap';
import MainHeader from '../Components/MainHeader';
import RangeSlider from '../Components/RangeSlider';
import Preferences from './Preferences';
import RadiusButton from '../Components/RadiusButton';

import * as dim from '../Styles/Dimensions';

const RangeSelection = ({ prefsModal, setPrefsModal, navigation }) => {
  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={prefsModal}>
        <Preferences setPrefsModal={setPrefsModal} navigation={navigation} />
      </Modal>
      <MainHeader />
      <View style={styles.radBtn}>
        <RadiusButton />
      </View>
      <SelectionMap />
      <RangeSlider />
    </View>
  );
};

export default RangeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radBtn: {
    position: 'absolute',
    zIndex: 2,
    width: dim.windowWidth / 3,
    top: dim.headerHeight,
    left: dim.windowWidth / 3,
    marginTop: 15,
  },
});
