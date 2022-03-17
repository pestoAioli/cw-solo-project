import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { background, highContrastReduced } from '../Styles/Colours';

interface LocationsListItemProps {
  navigation: {
    [key: string]: Function;
  };
  loc: {
    _id: string;
    name: string;
  };
}

const LocationsListItem = ({ navigation, loc }: LocationsListItemProps) => {
  const handleClick = useCallback(() => {
    navigation.navigate('Profile', {
      screen: 'Details',
      params: { destID: loc._id },
    });
  }, [loc]);

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <Text style={styles.title}>{loc.name}</Text>
    </TouchableOpacity>
  );
};

export default LocationsListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: highContrastReduced,
    marginVertical: 5,
    marginHorizontal: 20,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    color: background,
    paddingHorizontal: 20,
    fontSize: 21,
    fontFamily: 'Pridi_300Light',
  },
});
