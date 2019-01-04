import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Communications from 'react-native-communications';

import Button from '../../../appet/Button';

const PET_TYPES = {
  dog: 'Cachorro',
  cat: 'Gato',
  bird: 'Pássaro',
  other: 'Outros',
}

const ageText = (age) => {
  if (age > 12) {
    return `${age / 12} anos`;
  }
  if (age === 12) {
    return `${age} ano`;
  }
  if (age < 12) {
    return `${age} meses`;
  }
}

const ItemWrapper = (props) => {
  return (
    <View style={{ paddingVertical: 5, ...props.style }}>
      {props.children}
    </View>
  );
}

const Separator = () => (
  <View style={styles.separator}></View>
);

const DetailsRow = (props) => (
  <ItemWrapper style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ flex: 1 }}>
      <Text style={styles.description}>{props.title}</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.description}>{props.value}</Text>
    </View>
  </ItemWrapper>
);

class AdDetails extends Component {

  renderAproxAge = (age) => {
    if (age) {
      return (
        <DetailsRow title='Idade aprox.' value={ageText(age)} />
      )
    }
    return (<View />);
  }

  renderWeight = (weight) => {
    if (weight) {
      return (
        <DetailsRow title='Peso' value={`${weight} kg`} />
      )
    }
    return (<View />);
  }

  render() {
    const ad = this.props.navigation.getParam('item');
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Image source={{ uri: ad.img }} style={styles.image} />
          <View style={styles.mainView}>
            <ItemWrapper style={{ paddingVertical: 5 }}>
              <Text style={styles.title}>{ad.title}</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.datetime}>Publicado em {ad.datetime}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Descrição</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.description}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Detalhes</Text>
            </ItemWrapper>

            <DetailsRow title='Categoria' value={PET_TYPES[ad.pet_type]} />
            {this.renderWeight(ad.aprox_age)}
            {this.renderAproxAge(ad.aprox_age)}

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Localização</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.city} - {ad.state}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Dados para contato</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.user.phoneNumber}</Text>
            </ItemWrapper>

            <Separator />

            <ItemWrapper>
              <Text style={styles.sectionTitle}>Anunciado por</Text>
            </ItemWrapper>

            <ItemWrapper>
              <Text style={styles.description}>{ad.user.name.split(' ')[0]}</Text>
            </ItemWrapper>
          </View>
        </ScrollView>
        <Button text='Ligar' onPress={() => Communications.phonecall('84992120696', true)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 250,
  },
  mainView: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 25,
  },
  datetime: {
    color: '#000',
  },
  separator: {
    backgroundColor: '#CCC',
    width: '100%',
    height: 1,
    marginVertical: 10,
  },
  sectionTitle: {
    fontWeight: '400',
    fontSize: 18,
  },
  description: {
    textAlign: 'justify',
  }
});

export default AdDetails;