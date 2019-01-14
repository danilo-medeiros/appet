import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Button, AdsList } from '../../widgets';
import { fetchAds, fetchAd } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';
import { getData } from '../../../helpers';

class AdList extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentUser) {
      this.getCurrentUser();
    }

    if (!this.props.ads.count) {
      this.props.fetchAds();
    }
  }

  async getCurrentUser() {
    const token = await getData('token');
    if (token) {
      this.props.getCurrentUser();
    }
  }

  onAdSelectedHandler(item) {
    this.props.fetchAd(item.id);
    this.props.navigation.navigate('ShowAd');
  }

  navigateToAdForm() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('NewAd');
    } else {
      this.props.navigation.navigate('ProfileDetails');
    }
  }

  async onRefresh() {
    await this.props.fetchAds();
  }

  fetchMore() {
    this.props.fetchAds({
      page: ++this.props.ads.current_page,
      per_page: this.props.ads.per_page,
    });
  }

  renderList() {
    return (
      <AdsList
        ads={this.props.ads}
        isLoading={this.props.isLoading}
        fetchMore={() => this.fetchMore()}
        onAdSelectedHandler={item => this.onAdSelectedHandler(item)}
        onRefresh={() => this.onRefresh()}
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
    fetchAd: id => dispatch(fetchAd(id)),
    fetchAds: options => dispatch(fetchAds(options)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdList);
