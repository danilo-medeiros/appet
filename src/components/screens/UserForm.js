import React from 'react';
import { View, Text, TextInput, Picker, ToolbarAndroid } from 'react-native';
import Form from '../appet/Form';
import Theme from '../../theme/Theme';

export default class UserFormScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Novo cadastro'
  };

  render() {
    return (
      <Form>
        <TextInput placeholder='Seu nome' autoCapitalize='words' style={styles.textInput} />
        <TextInput placeholder='E-mail' keyboardType='email-address' style={styles.textInput} />
        <TextInput placeholder='Número do celular' keyboardType='number-pad' style={styles.textInput} />
        <TextInput placeholder='CEP' keyboardType='number-pad' style={styles.textInput} />
        <Picker selectedValue='rn'>
          <Picker.Item label='RN' value='rn' />
          <Picker.Item label='PB' value='rn' />
          <Picker.Item label='PE' value='rn' />
          <Picker.Item label='SP' value='rn' />
        </Picker>
        <TextInput placeholder='Bairro' autoCapitalize='words' style={styles.textInput} />
        <TextInput placeholder='Cidade' autoCapitalize='words' style={styles.textInput} />
      </Form>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: Theme.COLORS[4],
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: Theme.COLORS[0],
    width: '100%',
    marginBottom: 10,
  },
};