import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import t from 'tcomb-form-native';
import Button from '../../appet/Button';
import Theme from '../../../theme/Theme';
import { MANDATORY_FIELD_MESSAGE } from '../../../constants';

const Form = t.form.Form;

const Credentials = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    email: {
      label: 'Seu e-mail',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 40,
      keyboardType: 'email-address',
    },
    password: {
      label: 'Senha',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 12,
      secureTextEntry: true
    }
  }
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
    };
  }

  handleSubmit = () => {
    var value = this._form.getValue();
    if (value) {
      this.setState({
        credentials: value,
      });
      console.log(this.state);
      this.props.navigation.navigate('Ads');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.COLORS[5] }}>
        <View style={{ padding: 20, }}>
          <Form ref={c => this._form = c} options={options} type={Credentials}
            value={this.state.credentials} />
          <Button
            text="Entrar"
            onPress={this.handleSubmit}
          />
        </View>
        <View
          style={{
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            marginTop: 10,
          }}
        />
        <Text style={{ textAlign: 'center' }}>ou</Text>
        <View style={{ padding: 20 }}>
          <Button
            text="Criar conta com e-mail"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    marginBottom: 30,
  }
});

async function sendCredentials(credentials) {
  try {
    const response = await fetch(`${API_PATH}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credentials: credentials,
      }),
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro ao realizar a autenticação');
  }
}