import { StyleSheet, View, Modal } from 'react-native';
import React, { useState } from 'react';

import SelectionMap from '../Components/SelectionMap';
import MainHeader from '../Components/MainHeader';
import RangeSlider from '../Components/RangeSlider';
import Preferences from './Preferences';

const RangeSelection = ({ rangeSelected, setRangeSelected, navigation }) => {
  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={rangeSelected}>
        <Preferences
          setRangeSelected={setRangeSelected}
          navigation={navigation}
        />
      </Modal>
      <MainHeader />
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
});
