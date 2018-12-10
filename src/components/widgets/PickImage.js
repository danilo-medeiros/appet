import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Button from '../appet/Button';

export default class PickImage extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    pickedImaged: null
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Selecione uma foto"}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Ocorreu um erro", res.error);
      } else {
        this.setState({
          pickedImaged: { uri: res.uri }
        });
        this.props.onImagePicked({uri: res.uri, base64: res.data});
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImaged} style={styles.previewImage} />
        </View>
        <Button text="Escolher foto" onPress={this.pickImageHandler} />
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