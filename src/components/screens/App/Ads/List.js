import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../../appet/Button';
import AdsList from '../../../appet/AdsList';
import { selectAd } from '../../../../store/actions/ads';

class ListAds extends Component {

  constructor(props) {
    super(props);
  }

  onAdSelectedHandler(item) {
    // this.props.onSelectAd(key);
    this.props.navigation.navigate('ShowAd', { item });
  }

  render() {
    return (
      <View style={styles.container}>
        <AdsList ads={this.props.ads} onAdSelectedHandler={(item) => this.onAdSelectedHandler(item)} />
        <Button
          text="Cadastrar anúncio"
          onPress={() => this.props.navigation.navigate('AdsNew')}
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

const mapStateToProps = state => ({ ads: state.ads.ads });

const mapDispatchToProps = dispatch => ({ onSelectAd: (key) => dispatch(selectAd(key)) });

export default connect(mapStateToProps, mapDispatchToProps)(ListAds);
