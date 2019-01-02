import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Button from '../../../../appet/Button';
import Theme from '../../../../../theme/Theme';

export default class ProfileAds extends Component {
  static navigationOptions = {
    headerTitle: 'Meus anúncios',
    headerStyle: {
      backgroundColor: Theme.COLORS[2],
    },
    headerTintColor: Theme.COLORS[5],
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        </ScrollView>
        <Button
          text="Cadastrar-se"
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
});