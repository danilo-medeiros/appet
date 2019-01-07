import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';

import { MANDATORY_FIELD_MESSAGE } from '../../constants';

const Form = t.form.Form;

const Password = t.struct({
  password: t.String,
  password_confirmation: t.String,
});

const options = {
  fields: {
    password: {
      label: 'Senha',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 12,
      secureTextEntry: true
    },
    password_confirmation: {
      label: 'Confirme a senha',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 12,
      secureTextEntry: true
    },
  },
};

class UserPassword extends Component {

  state = {
    password: null,
  }

  handleSubmit() {
    const value = this._form.getValue();
    if (!value) {
      return;
    }
    if (value.password !== value.password_confirmation) {
      alert('As senhas não batem');
      return;
    }
    this.setState({
      ...value,
    });
    this.props.onSubmit(value);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Form ref={c => this._form = c}
              type={Password}
              value={this.state.password}
              options={options}
            />
          </View>
        </ScrollView>
        <Button
          text={this.props.isEditionMode ? 'Atualizar senha' : 'Cadastrar-se'}
          onPress={() => this.handleSubmit()}
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

export default UserPassword;
