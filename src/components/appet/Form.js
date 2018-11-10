import React from 'react';
import { View, Text } from 'react-native';

export default Form = (props) => (
  <View style={styles.container}>
    <View style={styles.form}>
      {props.children}
    </View>
  </View>
);

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
    padding: 10,
    backgroundColor: '#FFF',
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
};