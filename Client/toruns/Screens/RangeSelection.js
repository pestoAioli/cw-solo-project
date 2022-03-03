import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const RangeSelection = () => {
  return (
    <View style={styles.container}>
      <Text>RangeSelection</Text>
    </View>
  );
};

export default RangeSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C5E5A5',
  },
});
