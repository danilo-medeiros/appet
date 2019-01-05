import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import COLORS from '../../theme/Colors';

export default Button = (props) => (
  <TouchableHighlight
    style={styles.button}
    onPress={props.onPress}
    underlayColor={COLORS[1]}>
    <Text style={styles.text}>{props.text.toUpperCase()}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    backgroundColor: COLORS[2],
    elevation: 4,
  },
  text: {
    color: COLORS[5],
    fontWeight: 'bold',
    textAlign:'center',
  }
});