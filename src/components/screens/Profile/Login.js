import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import { Button } from '../../widgets';
import { MANDATORY_FIELD_MESSAGE } from '../../../constants';
import COLORS from '../../../theme/Colors';

import { login } from '../../../store/actions';

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
    this.nextRoute = navigatorRoute ? navigatorRoute : null;
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    if (value) {
      this.props.onLogin(value);
    }
  }

  render() {
    let submitButton;

    if (this.props.isLoading) {
      submitButton = (<Button
        text="Enviando..."
        onPress={() => { }}
      />);
    } else {
      submitButton = (<Button
        text="Entrar"
        onPress={this.handleSubmit}
      />);
    }

    return (
      <View style={styles.container}>
        <View style={{ padding: 20, }}>
          <Form ref={c => this._form = c} options={options} type={Credentials} />
          {submitButton}
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

const mapStateToProps = (state) => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (credentials) => dispatch(login(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
