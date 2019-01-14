import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import t from 'tcomb-form-native';
import { connect } from 'react-redux';

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
      secureTextEntry: true,
    },
    password_confirmation: {
      label: 'Confirme a senha',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 12,
      secureTextEntry: true,
    },
  },
};

class UserPassword extends Component {
  state = {
    password: null,
  };

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

  renderButton() {
    if (this.props.isLoading) {
      return <Button text="Carregando..." onPress={() => {}} />;
    }
    return (
      <Button
        text={this.props.isEditionMode ? 'Atualizar senha' : 'Cadastrar-se'}
        onPress={() => this.handleSubmit()}
      />
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Form
              ref={c => (this._form = c)}
              type={Password}
              value={this.state.password}
              options={options}
            />
          </View>
        </ScrollView>
        {this.renderButton()}
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
  },
});

const mapStateToProps = state => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPassword);
