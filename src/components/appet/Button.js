import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import Theme from '../../theme/Theme';

export default Button = (props) => (
  <TouchableHighlight
    style={styles.button}
    onPress={props.onPress}
    underlayColor={Theme.COLORS[1]}>
    <Text style={styles.text}>{props.text.toUpperCase()}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    backgroundColor: Theme.COLORS[2],
    borderRadius: 5,
    marginVertical: 5,
    elevation: 4,
  },
  text: {
    color: Theme.COLORS[5],
    fontWeight: 'bold',
    textAlign:'center',
  }
});