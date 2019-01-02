import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';

import Button from '../../../appet/Button';

export default class Ads extends Component {

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
        </ScrollView>
        <Button
          text="Cadastrar anúncio"
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {},
});