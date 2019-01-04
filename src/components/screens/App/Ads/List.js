import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../../appet/Button';
import AdsList from '../../../appet/AdsList';
import { selectAd } from '../../../../store/actions';

class ListAds extends Component {

  constructor(props) {
    super(props);
  }

  onAdSelectedHandler(item) {
    this.props.navigation.navigate('ShowAd', { item });
  }

  navigateToAdForm = () => {
    if (this.props.currentUser) {
      this.props.navigation.navigate('AdsNew');
    } else {
      this.props.navigation.navigate('Profile', { nextRoute: 'AdsNew' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <AdsList ads={this.props.ads} onAdSelectedHandler={(item) => this.onAdSelectedHandler(item)} />
        <Button
          text="Cadastrar anúncio"
          onPress={this.navigateToAdForm}
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

const mapStateToProps = state => ({ ads: state.ads.ads, currentUser: state.users.currentUser });

const mapDispatchToProps = dispatch => ({ onSelectAd: (key) => dispatch(selectAd(key)) });

export default connect(mapStateToProps, mapDispatchToProps)(ListAds);
