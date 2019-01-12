import React from 'react';
import { ScrollView, View, Image, Text, SafeAreaView, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation';
import COLORS from '../../theme/Colors';

const CustomDrawerContent = (props) => (
  <ScrollView>
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS[2],
        paddingVertical: 28,
        paddingLeft: 17,
        alignItems: 'center',
      }}
    >
      <Image source={require('../../assets/appet.png')} style={styles.icon} />
      <Text style={styles.title}>
        Appet
			</Text>
    </View>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    color: COLORS[4],
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 9,
    fontSize: 16,
  },
});

export default CustomDrawerContent;