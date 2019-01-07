import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';

import { Button } from '../../widgets';
import { Login } from '../Profile';

import COLORS from '../../../theme/Colors';

import { deleteToken } from '../../../store/actions';

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
  }

  logout() {
    Alert.alert('Sair do appet?', 'Você tem certeza que deseja sair do aplicativo?', [
      { text: 'Cancelar' },
      { text: 'Sim', onPress: () => this.props.onLogout() },
    ])
  }

  renderProfile() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{this.props.currentUser.name}</Text>
            <Text style={styles.detailsText}>{this.props.currentUser.email}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ paddingBottom: 10 }}>
              <Button text="Meus anúncios" onPress={() => this.props.navigation.navigate('ProfileAds')} />
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Button text="Atualizar dados" onPress={() => this.props.navigation.navigate('EditProfile')} />
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Button text="Sair" onPress={() => this.logout()} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  renderLogin() {
    return (<Login navigation={this.props.navigation} />);
  }

  render() {
    if (this.props.currentUser) {
      return this.renderProfile();
    }
    return this.renderLogin();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[5],
  },
  usernameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: COLORS[2],
    padding: 20,
  },
  username: {
    color: COLORS[5],
    fontWeight: 'bold',
    fontSize: 18,
  },
  userDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  detailsText: {
    fontSize: 15,
  },
  action: {
    color: COLORS[2],
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 10,
  },
});

const mapStateToProps = (state) => ({
  currentUser: state.users.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(deleteToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetails);
