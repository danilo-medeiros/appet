import React, { Component } from 'react';
import { FlatList, Image, Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import COLORS from '../../theme/Colors';
import { API_PATH } from '../../constants';

export default class AdsList extends Component {

  constructor(props) {
    super(props);
  }

  renderSeparator = () => (
    <View style={styles.separator}></View>
  )

  renderImage(ad) {
    if (ad.picture_url === null) {
      return (<Image source={require(`../../assets/picture.png`)}
        style={styles.listItemImage}/>);
    }
    return (<Image source={{ uri: `${API_PATH}${ad.picture_url}` }}
      style={styles.listItemImage}/>);
  }

  renderItem = (ad) => {
    return (
      <TouchableHighlight onPress={() => this.props.onAdSelectedHandler(ad)} underlayColor={COLORS[4]}>
        <View style={styles.listItemContainer}>
          {this.renderImage(ad)}
          <View style={styles.listItemDataContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {ad.title}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {ad.city}, {ad.state}
            </Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>
              {new Date(ad.created_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  _keyExtractor(item, index) {
    return item.id.toString();
  }

  render() {
    if (this.props.ads.length === 0) {
      return (
        <View style={styles.emptyListMessageContainer}>
          <Text style={styles.emptyListMessage}>Não há itens para mostrar</Text>
          <Icon name={'folder-open'} size={50} />
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.ads}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={({ item: ad }) => this.renderItem(ad)}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CCC',
  },
  emptyListMessageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListMessage: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingLeft: 5,
    backgroundColor: COLORS[5],
  },
  listItemImage: {
    width: 100,
    height: 100,
  },
  listItemDataContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
})