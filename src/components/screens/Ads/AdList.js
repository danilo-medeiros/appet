import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { Button, AdsList } from '../../widgets';
import { fetchAds } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';
import { getData } from '../../../helpers';

class AdList extends Component {

  constructor(props) {
    super(props);
    
    if (!this.props.currentUser) {
      this.getCurrentUser();
    }

    if (this.props.ads.length === 0) {
      this.props.fetchAds({currentPage: 1});
    }
  }

  async getCurrentUser() {
    const token = await getData('token');
    if (token) {
      this.props.getCurrentUser();
    }
  }

  onAdSelectedHandler(item) {
    this.props.navigation.navigate('ShowAd', { item });
  }

  navigateToAdForm() {
    if (this.props.currentUser) {
      this.props.navigation.navigate('NewAd');
    } else {
      this.props.navigation.navigate('ProfileDetails');
    }
  }

  renderList() {
    if (this.props.isLoading) {
      return (<View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size='large'></ActivityIndicator></View>);
    }
    return (<AdsList ads={this.props.ads}
      onAdSelectedHandler={(item) => this.onAdSelectedHandler(item)}
    />);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderList()}
        <Button
          text='Cadastrar anúncio'
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
    fetchAds: (options) => dispatch(fetchAds(options)),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdList);
