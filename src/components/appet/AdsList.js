import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableHighlight, StyleSheet, View, Platform } from 'react-native';

import Theme from '../../theme/Theme';

export default class AdsList extends Component {
  render() {
    return (
      <FlatList
        data={this.props.ads}
        renderItem={({ item: ad }) => (
          <TouchableHighlight onPress={() => console.log(ad)} underlayColor={Theme.COLORS[4]}>
            <View style={styles.listItemContainer}>
              <Image source={{ uri: ad.img }}
                style={styles.listItemImage} />
              <View style={styles.listItemDataContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {ad.title}
                </Text>
                <Text style={{ fontSize: 16 }}>
                  {ad.location}
                </Text>
                <Text style={{ fontSize: 14, color: 'gray' }}>
                  {ad.datetime}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 17,
    alignItems: 'center',
    backgroundColor: Theme.COLORS[5],
  },
  listItemImage: {
    width: 50,
    height: 50,
  },
  listItemDataContainer: {
    paddingHorizontal: 10,
  },
})