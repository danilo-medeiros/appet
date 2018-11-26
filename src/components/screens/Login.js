import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import t from 'tcomb-form-native';
import Button from '../appet/Button';
import Theme from '../../theme/Theme';
import { MANDATORY_FIELD_MESSAGE } from '../../constants';

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

  static navigationOptions = {
    headerTitle: 'Entrar no aplicativo',
    headerStyle: {
      backgroundColor: Theme.COLORS[2],
    },
    headerTintColor: Theme.COLORS[5],
  };

  handleSubmit = () => {
    var value = this._form.getValue();
    if (value) {
      sendCredentials(this.state.credentials);
    }
  }

  onChange = (credentials) => {
    this.setState({ credentials: credentials });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Form ref={c => this._form = c} options={options} type={Credentials}
            value={this.state.credentials} onChange={this.onChange} />
        </ScrollView>
        <Button
          text="Entrar"
          onPress={this.handleSubmit}
        />
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
    let response = await fetch(`${API_PATH}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        credentials: credentials,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch(error) {
    console.log(error);
    alert('Ocorreu um erro ao realizar a autenticação');
  }
}