import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';

export default home = (props) => (
  <View style={styles.container}>
    <Image source={require('./../assets/dog.png')} style={styles.icon} />
    <Text style={styles.title}>Appet</Text>
    <Text style={styles.welcomeMessage}>Encontre o seu melhor amigo aqui!</Text>
    <View style={[{ width: "70%", margin: 5 }]}>
      <TouchableHighlight
        style={styles.submit}
        onPress={() => { }}
        underlayColor='#A1869E'>
        <Text style={styles.submitText}>ENTRAR</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.submit}
        onPress={() => { }}
        underlayColor='#A1869E'>
        <Text style={styles.submitText}>CADASTRAR-SE</Text>
      </TouchableHighlight>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF4EC',
  },
  icon: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeMessage: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  submit:{
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#966B9D',
    borderRadius: 20,
    margin: 5,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      fontWeight: 'bold',
      textAlign:'center',
  }
});