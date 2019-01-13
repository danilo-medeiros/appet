import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { AdsList } from '../../widgets';
import { fetchProfileAds, selectAd } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';

class ProfileAdList extends Component {

  constructor(props) {
    super(props);

    if (this.props.currentUser) {
      this.props.fetchAds({currentPage: 1}, this.props.currentUser.id);
    }
  }

  onAdSelectedHandler(item) {
    this.props.selectAd(item);
    this.props.navigation.navigate('ShowProfileAd');
  }

  renderList() {
    if (this.props.isLoading) {
      return (<View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size='large'></ActivityIndicator></View>);
    }
    return (<AdsList ads={this.props.profileAds}
      onAdSelectedHandler={(item) => this.onAdSelectedHandler(item)}
    />);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
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
    selectAd: (item) => dispatch(selectAd(item)),
    fetchAds: (options, userId) => dispatch(fetchProfileAds(options, userId)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAdList);
