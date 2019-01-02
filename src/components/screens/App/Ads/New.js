import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import t from 'tcomb-form-native';
import Button from '../../../appet/Button';
import { UFS, MANDATORY_FIELD_MESSAGE } from '../../../../constants';
import PickImage from '../../../widgets/PickImage';

const Form = t.form.Form;

const PetType = t.enums({
  'dog': 'Cachorro',
  'cat': 'Gato',
  'bird': 'Pássaro',
  'fish': 'Peixe',
  'others': 'Outros'
}, 'PetType');

const SizeType = t.enums({
  'P': 'P',
  'M': 'M',
  'G': 'G',
  'GG': 'GG',
}, 'SizeType');

const Uf = t.enums(UFS, 'Uf');

const Ad = t.struct({
  petName: t.maybe(t.String),
  petType: PetType,
  description: t.maybe(t.String),
  aproxAge: t.Number,
  weight: t.maybe(t.Number),
  sizeType: SizeType,
  cep: t.maybe(t.String),
  district: t.String,
  uf: Uf,
  city: t.String,
});

const options = {
  i18n: {
    ...Form.i18n,
    optional: ' (opcional)',
  },
  fields: {
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
      multiline: true,
    },
    aproxAge: {
      label: 'Idade aprox. em meses',
    },
    weight: {
      label: 'Peso aprox.',
    },
    sizeType: {
      label: 'Tamanho',
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
}

class NewAd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {
        image: null,
      },
    }
  }

  onImagePicked = image => {
    this.setState(prevState => {
      return {
        ad: {
          ...prevState.ad,
          image: {
            value: image,
            valid: true,
          }
        }
      }
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <PickImage onImagePicked={this.onImagePicked} />
          <View style={styles.form}>
            <Form ref={c => this._form = c} type={Ad} value={this.state.ad} options={options} />
          </View>
        </ScrollView>
        <Button text='Confirmar' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    marginBottom: 30,
  }
});

export default NewAd;