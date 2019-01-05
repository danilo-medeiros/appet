import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MainDrawerIcon = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Icon name="bars" style={{ padding: 10, marginLeft: 10 }} size={20} color='white' />
    </TouchableOpacity>
  );
};

export default MainDrawerIcon;