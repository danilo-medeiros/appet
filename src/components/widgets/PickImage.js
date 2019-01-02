import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../appet/Button';

export default class PickImage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    pickedImage: null
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Selecione uma foto"}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Ocorreu um erro", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  pickedImage = () => {
    if (this.state.pickedImage) {
      return <Image source={this.state.pickedImage} style={styles.previewImage} />;
    }
    return (
      <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: 10 }}>Selecione uma imagem</Text>
        <Icon name={'camera'} size={30} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pickImageHandler}>
          <View style={styles.placeholder}>
            {this.pickedImage()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  placeholder: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#eee',
    width: '100%',
    height: 150
  },
  previewImage: {
    width: '100%',
    height: '100%',
  }
});