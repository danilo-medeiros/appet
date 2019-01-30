import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import { Button, AdsList, SearchHeader } from '../../widgets';
import { fetchAds, fetchAd, setFilter } from '../../../store/actions/ads';
import { getCurrentUser } from '../../../store/actions';
import { getData } from '../../../helpers';
import jwtDecode from 'jwt-decode';
import { refreshRegister } from '../../../store/actions/users';

class AdList extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentUser) {
      this.loadData();
    } else {
      this.props.fetchAds({ filter: this.props.filter });
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: SearchHeader({
        onSearchPressed: () => {},
        onFilterPressed: () => navigation.navigate('AdListFilter'),
      }),
    };
  };

  componentDidMount() {
    SplashScreen.hide();
  }

  async loadData() {
    const token = await getData('token');
    let filter = this.props.filter;

    if (token) {
      let user;
      if (this.isValidToken(token)) {
        user = await this.props.getCurrentUser();
      } else {
        user = await this.props.refreshRegister();
      }
      filter = { ...this.props.filter, state: user.state };
      this.props.setFilter(filter);
    }

    if (!this.props.ads.count) {
      this.props.fetchAds(filter);
    }
  }

  isValidToken(token) {
    return jwtDecode(token).exp > new Date().getTime();
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
    await this.props.fetchAds({ ...this.props.filter });
  }

  fetchMore() {
    this.props.fetchAds({
      page: ++this.props.ads.current_page,
      per_page: this.props.ads.per_page,
      ...this.props.filter,
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
    filter: state.ads.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAd: id => dispatch(fetchAd(id)),
    fetchAds: options => dispatch(fetchAds(options)),
    refreshRegister: () => dispatch(refreshRegister()),
    getCurrentUser: () => dispatch(getCurrentUser()),
    setFilter: filter => dispatch(setFilter(filter)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdList);
