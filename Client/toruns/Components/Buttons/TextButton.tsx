import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import * as col from '../../Styles/Colours';

interface TextButtonProps {
  text: string;
  handleClick: { (event: GestureResponderEvent): void };
}

const TextButton = ({ text, handleClick }: TextButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.shadow]}
      onPress={handleClick}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: col.highContrast,
    height: 60,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: col.background,
    fontWeight: '400',
    fontFamily: 'Signika_300Light',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
});
