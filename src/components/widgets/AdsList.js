import React, { Component } from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import COLORS from '../../theme/Colors';
import { API_PATH } from '../../constants';

export default class AdsList extends Component {
  state = {
    refreshing: false,
  };

  constructor(props) {
    super(props);
  }

  renderSeparator = () => <View style={styles.separator} />;

  renderImage(ad) {
    if (ad.picture_url === null) {
      return (
        <Image
          source={require(`../../assets/picture.png`)}
          style={styles.listItemImage}
        />
      );
    }
    return (
      <Image
        source={{ uri: `${API_PATH}${ad.picture_url}` }}
        style={styles.listItemImage}
      />
    );
  }

  selectItem(item) {
    this.props.onAdSelectedHandler(item);
  }

  renderItem = ad => {
    return (
      <TouchableHighlight
        onPress={() => this.selectItem(ad)}
        underlayColor={COLORS[4]}>
        <View style={styles.listItemContainer}>
          {this.renderImage(ad)}
          <View style={styles.listItemDataContainer}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{ad.title}</Text>
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
  };

  _keyExtractor(item, index) {
    return item.id.toString();
  }

  renderFooter() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE',
          }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return (
      <View
        style={{
          paddingVertical: 10,
        }}>
        <Text style={styles.endOfList}>Não há mais itens</Text>
      </View>
    );
  }

  onEndReached() {
    if (!this.props.isLoading && this.props.ads.canLoadMore) {
      this.props.fetchMore();
    }
  }

  async onRefresh() {
    this.setState({
      ...this.state,
      refreshing: true,
    });
    if (!this.props.isLoading) {
      await this.props.onRefresh();
      this.setState({
        ...this.state,
        refreshing: false,
      });
    }
  }

  render() {
    if (this.props.ads.records.length === 0 && !this.props.isLoading) {
      return (
        <View style={styles.emptyListMessageContainer}>
          <Text style={styles.emptyListMessage}>Não há itens para mostrar</Text>
          <Icon name={'folder-open'} size={50} />
        </View>
      );
    }

    return (
      <FlatList
        data={this.props.ads.records}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={this._keyExtractor}
        renderItem={({ item: ad }) => this.renderItem(ad)}
        ListFooterComponent={() => this.renderFooter()}
        onEndReached={() => this.onEndReached()}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.refreshing}
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
    alignItems: 'center',
  },
  emptyListMessage: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
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
  endOfList: {
    textAlign: 'center',
  },
});
