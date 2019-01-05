import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { fetchPostalCodeAddress, isPostalCodeValid } from '../../helpers/PostalCode';

import t from 'tcomb-form-native';
import { maybe } from 'tcomb';
import { UFS, MANDATORY_FIELD_MESSAGE } from '../../constants';

import Button from './Button';

const Form = t.form.Form;

const Uf = t.enums(UFS, 'Uf');

const User = t.struct({
  name: t.String,
  email: t.String,
  phoneNumber: t.String,
  postalCode: maybe(t.String),
  neighborhood: t.String,
  state: Uf,
  city: t.String,
});

const options = {
  i18n: {
    ...Form.i18n,
    optional: ' (opcional)',
  },
  fields: {
    name: {
      label: 'Nome completo',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 40,
      autoCapitalize: 'words',
    },
    email: {
      label: 'E-mail',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 40,
      keyboardType: 'email-address',
    },
    phoneNumber: {
      label: 'Número do celular',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 11,
      keyboardType: 'number-pad',
    },
    postalCode: {
      label: 'CEP',
      maxLength: 8,
      keyboardType: 'number-pad',
    },
    state: {
      label: 'Estado',
      error: MANDATORY_FIELD_MESSAGE,
    },
    neighborhood: {
      label: 'Bairro',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 30,
      autoCapitalize: 'words',
    },
    city: {
      label: 'Cidade',
      error: MANDATORY_FIELD_MESSAGE,
      maxLength: 30,
      autoCapitalize: 'words',
    },
  },
};

class UserForm extends Component {

  state = {
    user: null,
    postalCode: null,
  };

  constructor(props) {
    super(props);
    if (this.props.isEditionMode) {
      this.state = {
        ...this.state,
        user: this.props.currentUser,
      };
    }
  }

  updatePostalCode(user) {
    const newPostalCode = user.postalCode;
    if (newPostalCode !== this.state.postalCode && isPostalCodeValid(newPostalCode)) {
      fetchPostalCodeAddress(newPostalCode).then(address => {
        if (address) {
          this.setState({
            user: {
              ...user,
              ...address,
            },
            postalCode: newPostalCode,
          });
        }
      });
    }
  }

  handleSubmit() {
    const value = this._form.getValue();
    if (value) {
      this.setState({
        ...this.state,
        value,
      });
      this.props.onSubmit(value);
    }
  }

  onChange(user) {
    this.updatePostalCode(user);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Form ref={c => this._form = c}
              type={User}
              value={this.state.user}
              options={options}
              onChange={this.onChange.bind(this)}
            />
          </View>
        </ScrollView>
        <Button
          text={this.props.isEditionMode ? 'Atualizar' : 'Cadastrar-se'}
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

export default UserForm;
