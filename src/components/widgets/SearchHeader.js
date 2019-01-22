import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchHeader = ({ onSearchPressed, onFilterPressed }) => (
  <View style={{ marginRight: 10, flex: 1, flexDirection: 'row' }}>
    <TouchableOpacity onPress={onSearchPressed}>
      <Icon name="search" style={{ padding: 10 }} size={20} color='white' />
    </TouchableOpacity>
    <TouchableOpacity onPress={onFilterPressed}>
      <Icon name="sliders" style={{ padding: 10 }} size={20} color='white' />
    </TouchableOpacity>
  </View>
);

export default SearchHeader;