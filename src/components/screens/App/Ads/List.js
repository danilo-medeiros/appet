import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../../../appet/Button';
import AdsList from '../../../appet/AdsList';

export default class ListAds extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ads: [
        {
          key: '1',
          title: 'Gato persa',
          location: 'Parnamirim',
          datetime: '8 de junho, 22:10',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '2',
          title: 'Cachorro de rua',
          location: 'Natal',
          datetime: '8 de junho, 22:15',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '3',
          title: 'Filhotes de gatos',
          location: 'Macaíba',
          datetime: '7 de junho, 11:10',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '4',
          title: 'Filhotes de gatos',
          location: 'Macaíba',
          datetime: '7 de junho, 11:10',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '5',
          title: 'Filhotes de gatos',
          location: 'Macaíba',
          datetime: '7 de junho, 11:10',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '6',
          title: 'Filhotes de gatos',
          location: 'Macaíba',
          datetime: '7 de junho, 11:10',
          img: 'https://picsum.photos/200/200/?random',
        },
        {
          key: '7',
          title: 'Filhotes de gatos',
          location: 'Macaíba',
          datetime: '7 de junho, 11:10',
          img: 'https://picsum.photos/200/200/?random',
        }
      ]
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AdsList ads={this.state.ads} />
        <Button
          text="Cadastrar anúncio"
          onPress={() => this.props.navigation.navigate('AdsNew')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});