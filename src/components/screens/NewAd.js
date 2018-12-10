import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import t from 'tcomb-form-native';
import Button from '../appet/Button';
import { UFS, MANDATORY_FIELD_MESSAGE } from '../../constants';
import Theme from '../../theme/Theme';
import PickImage from '../widgets/PickImage';

const Form = t.form.Form;

const PetType = t.enums({
  'dog': 'Cachorro',
  'cat': 'Gato',
  'bird': 'Pássaro',
  'fish': 'Peixe',
  'others': 'Outros'
}, 'PetType');

const SizeType = t.enums({
  'sm': 'Pequeno (Apartamento)',
  'md': 'Médio (Casa)',
  'lg': 'Grande (Quintal)',
  'xg': 'Muito grande (Campo)',
}, 'SizeType');

const Uf = t.enums(UFS, 'Uf');

const Ad = t.struct({
  petName: t.String,
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
      label: 'Idade aprox. em anos',
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

  static navigationOptions = {
    headerTitle: 'Novo anúncio',
    headerStyle: {
      backgroundColor: Theme.COLORS[2],
    },
    headerTintColor: Theme.COLORS[5],
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
          <View style={styles.form}>
            <Form ref={c => this._form = c} type={Ad} value={this.state.ad} options={options} />
            <PickImage onImagePicked={this.onImagePicked} />
          </View>
        </ScrollView>
        <Button text='Confirmar' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
  },
  form: {
    marginBottom: 30,
  }
});

export default NewAd;