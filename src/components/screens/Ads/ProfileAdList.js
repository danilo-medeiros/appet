import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { AdsList } from '../../widgets';
import { fetchProfileAds, selectAd, fetchAd } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';

class ProfileAdList extends Component {
  constructor(props) {
    super(props);

    if (this.props.currentUser) {
      this.props.fetchAds({ ransack: { user_id: this.props.currentUser.id } });
    }
  }

  onAdSelectedHandler(item) {
    this.props.fetchAd(item.id);
    this.props.navigation.navigate('ShowProfileAd');
  }

  renderList() {
    if (this.props.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <AdsList
        ads={this.props.profileAds}
        onAdSelectedHandler={item => this.onAdSelectedHandler(item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
        <Button
          text="Cadastrar anúncio"
          onPress={() => this.props.navigation.navigate('NewAd')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    profileAds: state.ads.profileAds,
    currentUser: state.users.currentUser,
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAd: id => dispatch(fetchAd(id)),
    fetchAds: options => dispatch(fetchProfileAds(options)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileAdList);
