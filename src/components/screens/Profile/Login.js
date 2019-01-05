import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import { Button } from '../../widgets';
import { MANDATORY_FIELD_MESSAGE } from '../../../constants';
import COLORS from '../../../theme/Colors';

import { setCurrentUser } from '../../../store/actions';

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

class Login extends Component {
  constructor(props) {
    super(props);
    const navigatorRoute = this.props.navigation.getParam('nextRoute');
    this.nextRoute = navigatorRoute ? navigatorRoute : 'Ads';
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value) {
      this.props.onAuthenticate(value);
      this.props.navigation.navigate(this.nextRoute);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ padding: 20, }}>
          <Form ref={c => this._form = c} options={options} type={Credentials} />
          <Button
            text="Entrar"
            onPress={this.handleSubmit}
          />
        </View>
        <Text style={styles.or}>ou</Text>
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
    flex: 1,
    backgroundColor: COLORS[5]
  },
  form: {
    marginBottom: 30,
  },
  or: {
    textAlign: 'center',
    color: '#000',
    fontSize: 17,
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onAuthenticate: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
