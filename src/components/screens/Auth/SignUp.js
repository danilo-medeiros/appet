import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import t from 'tcomb-form-native';
import { maybe } from 'tcomb';
import Button from '../../appet/Button';
import { UFS, MANDATORY_FIELD_MESSAGE, CEP_PATH, API_PATH } from '../../../constants';
import { setCurrentUser } from '../../../store/actions';
import { fetchPostalCodeAddress, isPostalCodeValid } from '../../../helpers/PostalCode';

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

class SignUp extends Component {

  state = {
    user: null,
    postalCode: null,
  };

  constructor(props) {
    super(props);
    console.log(props);
  }

  handleSubmit = () => {
    var value = this._form.getValue();
    if (value) {
      const user = {
        ...value,
        id: Math.round(Math.random() * 100),
      }
      this.props.onSave(user);
      this.navigation.navigate('Profile');
    }
  }

  updatePostalCode(newPostalCode) {
    if (newPostalCode !== this.state.postalCode && isPostalCodeValid(newPostalCode)) {
      fetchPostalCodeAddress(newPostalCode).then(address => {
        console.log(address);
        this.setState({
          user: {
            ...this.state.user,
            ...address,
          },
          postalCode: newPostalCode,
        });
      }).catch(() => {
        this.setState({
          user: {
            ...this.state.user,
            ...{ state: null, neighborhood: null, city: null },
          },
          postalCode: null,
        });
      });
    }
  }

  onChange(user) {
    this.updatePostalCode(user.postalCode);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.form}>
            <Form ref={c => this._form = c} type={User} value={this.state.user} options={options} onChange={this.onChange.bind(this)} />
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
  fetchPostalCodeAddress
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

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  onSave: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);