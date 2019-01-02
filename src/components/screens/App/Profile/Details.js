import React, { Component } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Theme from '../../../../theme/Theme';
import Button from '../../../appet/Button';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: 'Danilo dos Santos Medeiros',
        email: 'danilomedeiros03@gmail.com',
        phoneNumber: '84992120696',
        birthdate: '1997-05-02',
        state: 'MA',
        city: 'São Luiz',
        neighborhood: 'Centro',
      },
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.usernameContainer}>
            <Text style={styles.username}>{this.state.profile.name}</Text>
            <Text style={styles.detailsText}>{this.state.profile.email}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View style={{ paddingBottom: 10 }}>
              <Button text="Meus anúncios" onPress={() => this.props.navigation.navigate('ProfileAds')} />
            </View>
            <View style={{ paddingBottom: 10 }}>
              <Button text="Atualizar dados" onPress={() => this.props.navigation.navigate('ProfileEdit')} />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS[5],
  },
  usernameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Theme.COLORS[3],
    padding: 20,
  },
  username: {
    color: Theme.COLORS[5],
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
    color: Theme.COLORS[2],
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginHorizontal: 10,
  },
});