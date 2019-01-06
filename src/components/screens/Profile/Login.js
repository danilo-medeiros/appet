import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import { Button } from '../../widgets';
import { MANDATORY_FIELD_MESSAGE } from '../../../constants';
import COLORS from '../../../theme/Colors';

import { setCurrentUser, setToken } from '../../../store/actions';
import { sendCredentials, register } from '../../../api';
import { storeData } from '../../../helpers';

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

  onAuthenticationFinished(user) {
    // this.props.onAuthenticate(token);
    this.props.onRegister(user);
    this.props.navigation.navigate(this.nextRoute);
  } 

  async authenticate(credentials) {
    try {
      const authResponse = await sendCredentials(credentials);
      const registerResponse = await register(authResponse.token);
      /* await storeData('currentUser', registerResponse);
      await storeData('token', authResponse.token); */
      this.onAuthenticationFinished(registerResponse);
    } catch (e) {
      alert(e.message);
    }
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value) {
      this.authenticate(value);
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (user) => dispatch(setCurrentUser(user)),
  onAuthenticate: (token) => dispatch(setToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
