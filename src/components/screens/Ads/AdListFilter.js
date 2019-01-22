import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import t from 'tcomb-form-native';

import { Button } from '../../widgets';
import { PET_TYPES, SIZE_TYPES, UFS } from '../../../constants';
import { setFilter, fetchAds } from '../../../store/actions/ads';

const Form = t.form.Form;

const order = t.enums(
  {
    created_at__false: 'Mais recentes',
    created_at__true: 'Mais antigos',
    aprox_age__false: 'Animais mais novos',
    aprox_age__true: 'Animais mais velhos',
  },
  'Order',
);

const PetType = t.enums(PET_TYPES, 'PetType');
const SizeType = t.enums(SIZE_TYPES, 'SizeType');
const Uf = t.enums(UFS, 'Uf');

const Filter = t.struct({
  order,
  pet_type: t.maybe(PetType),
  size: t.maybe(SizeType),
  state: t.maybe(Uf),
});

const options = {
  i18n: {
    ...Form.i18n,
    optional: '',
  },
  fields: {
    order: {
      label: 'Ordenar por',
    },
    pet_type: {
      label: 'Categoria',
    },
    size: {
      label: 'Tamanho',
    },
    state: {
      label: 'Estado',
    },
  },
};

class AdListFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        size: this.props.filter.size,
        state: this.props.filter.state,
        order: `${this.props.filter.order_by}__${this.props.filter.asc}`,
      },
    };
  }

  onSubmit() {
    const value = this._form.getValue();
    const order = value.order.split('__');
    const filter = {
      order_by: order[0],
      asc: order[1] === 'true',
      size: value.size,
      state: value.state,
    };
    this.props.setFilter(filter);
    this.props.fetchAds({ filter: filter });
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <ScrollView style={styles.form}>
          <Form
            ref={c => (this._form = c)}
            type={Filter}
            value={this.state.filter}
            options={options}
          />
        </ScrollView>
        <Button text="Pesquisar" onPress={() => this.onSubmit()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    marginBottom: 30,
  },
});

const mapStateToProps = state => {
  return {
    filter: state.ads.filter,
  };
};

const mapDispatchToProps = dispatch => ({
  setFilter: filter => dispatch(setFilter(filter)),
  fetchAds: options => dispatch(fetchAds(options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdListFilter);
