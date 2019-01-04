import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

import t from 'tcomb-form-native';
import Button from '../../../appet/Button';
import { UFS, MANDATORY_FIELD_MESSAGE } from '../../../../constants';
import PickImage from '../../../widgets/PickImage';
import { insertAd } from '../../../../store/actions';

const Form = t.form.Form;

const PetType = t.enums({
  'dog': 'Cachorro',
  'cat': 'Gato',
  'bird': 'Pássaro',
  'fish': 'Peixe',
  'others': 'Outros'
}, 'PetType');

const SizeType = t.enums({
  'p': 'P',
  'm': 'M',
  'g': 'G',
  'gg': 'GG',
}, 'SizeType');

const Uf = t.enums(UFS, 'Uf');

const Ad = t.struct({
  title: t.String,
  petName: t.maybe(t.String),
  petType: PetType,
  description: t.String,
  aproxAge: t.maybe(t.Number),
  weight: t.maybe(t.Number),
  size: SizeType,
  cep: t.maybe(t.String),
  neighborhood: t.String,
  city: t.String,
  state: Uf,
});

const options = {
  i18n: {
    ...Form.i18n,
    optional: ' (opcional)',
  },
  fields: {
    title: {
      label: 'Título do anúncio',
      maxLength: 30,
      autoCapitalize: 'words',
    },
    petName: {
      label: 'Nome do pet',
      maxLength: 40,
      autoCapitalize: 'words',
    },
    petType: {
      label: 'Tipo de pet',
      error: MANDATORY_FIELD_MESSAGE
    },
    description: {
      label: 'Descrição',
      maxLength: 100,
      numberOfLines: 5,
      multiline: true,
    },
    aproxAge: {
      label: 'Idade aprox. em meses',
    },
    weight: {
      label: 'Peso aprox.',
    },
    size: {
      label: 'Tamanho',
    },
    cep: {
      label: 'CEP',
      maxLength: 8,
      keyboardType: 'number-pad',
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
    state: {
      label: 'Estado',
      error: MANDATORY_FIELD_MESSAGE,
    },
  },
}

class NewAd extends Component {

  state = {
    ad: null,
    image: null,
  }

  constructor(props) {
    super(props);
  }

  onImagePicked(image) {
    this.setState(prevState => ({
      ...prevState,
      image,
    }));
  }

  handleSubmit() {
    const value = this._form.getValue();
    if (value) {
      const user = { ...value, user: this.props.currentUser };
      this.props.onSave(user);
      this.props.navigation.navigate('ShowAd', { item: user });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <PickImage onImagePicked={this.onImagePicked} />
          <View style={styles.form}>
            <Form ref={c => this._form = c} type={Ad} value={this.state.user} options={options} />
          </View>
        </ScrollView>
        <Button text='Confirmar' onPress={() => this.handleSubmit()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    marginBottom: 30,
  },
  description: {
    height: 200,
  }
});

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onSave: (ad) => dispatch(insertAd(ad)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAd);