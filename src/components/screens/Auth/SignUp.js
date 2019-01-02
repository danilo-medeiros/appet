import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import t from 'tcomb-form-native';
import { maybe } from 'tcomb';
import Button from '../../appet/Button';
import { UFS, MANDATORY_FIELD_MESSAGE, CEP_PATH, API_PATH } from '../../../constants';

const Form = t.form.Form;

const Uf = t.enums(UFS, 'Uf');

const User = t.struct({
  /* name: t.String,
  email: t.String,
  phoneNumber: t.String,
  birthDate: t.Date,
  cep: maybe(t.String),
  district: t.String,
  uf: Uf,
  city: t.String, */

  name: t.String,
  email: t.String,
  phoneNumber: maybe(t.String),
  birthDate: maybe(t.Date),
  cep: maybe(t.String),
  district: maybe(t.String),
  uf: maybe(Uf),
  city: maybe(t.String),
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
    birthDate: {
      label: 'Data de nascimento',
      error: MANDATORY_FIELD_MESSAGE,
      mode: 'date',
      defaultValueText: 'Selecione uma data',
    },
    cep: {
      label: 'CEP',
      maxLength: 8,
      keyboardType: 'number-pad',
    },
    uf: {
      label: 'Estado',
      error: MANDATORY_FIELD_MESSAGE,
    },
    district: {
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

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  handleSubmit = () => {
    var value = this._form.getValue();
    if (value) {
      // sendUser(this.state.user);
      console.log(this.state.user);
    }
  }

  onChange = (user) => {
    const cep = new Cep(user.cep);
    if (cep.canReload(this.state.user.cep)) {
      getCep(user.cep)
        .then((cepDetails) => this.setState({
          user: { ...user, ...cepDetails },
        }),
      );
    }
    this.setState({ user: { ...user } });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Form ref={c => this._form = c} type={User} value={this.state.user} options={options} onChange={this.onChange} />
          </View>
        </ScrollView>
        <Button
          text="Cadastrar-se"
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

async function getCep(cep) {
  try {
    let response = await fetch(`${CEP_PATH}/${cep}/json`);
    let responseJson = await response.json();
    return {
      uf: responseJson.uf,
      cep: responseJson.cep.replace(/-/g, ''),
      district: responseJson.bairro,
      city: responseJson.localidade,
    };
  } catch (error) {
    alert('Ocorreu um erro');
  }
}

async function sendUser(user) {
  try {
    let response = await fetch(`${API_PATH}/sign_up`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro ao realizar o cadastro');
  }
}

class Cep {
  constructor(cep) {
    this.cep = cep;
  }

  isValid() {
    return this.cep !== null && this.cep !== undefined && this.cep.length === 8;
  }

  equals(cep) {
    return this.cep === cep;
  }

  canReload(cep) {
    return this.isValid() && !this.equals(cep);
  }
}