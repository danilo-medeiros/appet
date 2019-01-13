import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Button, AdsList } from '../../widgets';
import { fetchAds, selectAd } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';
import { getData } from '../../../helpers';

class AdList extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentUser) {
      this.getCurrentUser();
    }

    if (!this.props.ads.count) {
      this.props.fetchAds({ currentPage: 1, per_page: this.props.ads.per_page });
    }
  }

  async getCurrentUser() {
    const token = await getData('token');
    if (token) {
      this.props.getCurrentUser();
    }
  }

  onAdSelectedHandler(item) {
    this.props.selectAd(item);
    this.props.navigation.navigate('ShowAd');
  }

  navigateToAdForm() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('NewAd');
    } else {
      this.props.navigation.navigate('ProfileDetails');
    }
  }

  fetchMore() {
    this.props.fetchAds({ currentPage: this.props.ads.current_page++, per_page: this.props.ads.per_page });
  }

  renderList() {
    console.log(this.props.ads.records);
    return (
      <AdsList
        ads={this.props.ads}
        isLoading={this.props.isLoading}
        fetchMore={ () => this.fetchMore() }
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
          onPress={() => this.navigateToAdForm()}
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
    ads: state.ads.ads,
    currentUser: state.users.currentUser,
    isLoading: state.ui.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectAd: item => dispatch(selectAd(item)),
    fetchAds: options => dispatch(fetchAds(options)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdList);
