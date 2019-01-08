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
  phone_number: t.String,
  postal_code: maybe(t.String),
  neighborhood: t.String,
  city: t.String,
  state: Uf,
});

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

  formOptions() {
    return {
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
          returnKeyType: 'next',
          onSubmitEditing: () => this._form.getComponent('email').refs.input.focus(),
        },
        email: {
          label: 'E-mail',
          error: MANDATORY_FIELD_MESSAGE,
          maxLength: 40,
          keyboardType: 'email-address',
          returnKeyType: 'next',
          onSubmitEditing: () => this._form.getComponent('phone_number').refs.input.focus(),
        },
        phone_number: {
          label: 'Número do celular',
          error: MANDATORY_FIELD_MESSAGE,
          maxLength: 11,
          keyboardType: 'number-pad',
          returnKeyType: 'next',
          onSubmitEditing: () => this._form.getComponent('postal_code').refs.input.focus(),
        },
        postal_code: {
          label: 'CEP',
          maxLength: 8,
          keyboardType: 'number-pad',
          returnKeyType: 'next',
          onSubmitEditing: () => this._form.getComponent('neighborhood').refs.input.focus(),
        },
        neighborhood: {
          label: 'Bairro',
          error: MANDATORY_FIELD_MESSAGE,
          maxLength: 30,
          autoCapitalize: 'words',
          returnKeyType: 'next',
          onSubmitEditing: () => this._form.getComponent('city').refs.input.focus(),
        },
        city: {
          label: 'Cidade',
          error: MANDATORY_FIELD_MESSAGE,
          maxLength: 30,
          autoCapitalize: 'words',
        },
        state: {
          label: 'Estado',
          error: MANDATORY_FIELD_MESSAGE,
        },
      }
    };
  }

  updatePostalCode(user) {
    const newPostalCode = user.postal_code;
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
              options={this.formOptions()}
              onChange={this.onChange.bind(this)}
            />
          </View>
        </ScrollView>
        <Button
          text={this.props.isEditionMode ? 'Atualizar' : 'Próximo'}
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
