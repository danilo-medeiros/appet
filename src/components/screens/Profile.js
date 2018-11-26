import React, { Component } from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import Theme from '../../theme/Theme';
import Button from '../appet/Button';

export default class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.profileImageView}>
            <Image source={require('./../../assets/boy.png')} style={styles.profileImage} />
            <Text style={styles.username}>Nome do usuário</Text>
          </View>
          <View style={styles.userView}>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>E-mail:</Text>
              <Text style={styles.detailsText}>teste@gmail.com</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>Número do celular:</Text>
              <Text style={styles.detailsText}>84 992120696</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>Data de nascimento:</Text>
              <Text style={styles.detailsText}>12/05/2000</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>Estado:</Text>
              <Text style={styles.detailsText}>RN</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>Cidade:</Text>
              <Text style={styles.detailsText}>Parnamirim</Text>
            </View>
            <View style={styles.userDetail}>
              <Text style={styles.detailsText}>Bairro:</Text>
              <Text style={styles.detailsText}>Centro</Text>
            </View>
          </View>
        </ScrollView>
        <Button text="Editar"></Button>
      </View>
    );
  }

  static navigationOptions = {
    headerTitle: 'Detalhes do perfil',
    headerStyle: {
      backgroundColor: Theme.COLORS[2],
    },
    headerTintColor: Theme.COLORS[5],
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS[4],
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  profileImageView: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Theme.COLORS[3],
    padding: 20,
  },
  username: {
    color: Theme.COLORS[5],
    fontWeight: 'bold',
  },
  userView: {
    padding: 20,
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
});