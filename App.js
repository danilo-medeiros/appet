import React from 'react'
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native'

import {
  createStackNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import SignUp from './src/components/screens/Auth/SignUp';
import Login from './src/components/screens/Auth/Login';
import Profile from './src/components/screens/App/Profile/Profile';
import Theme from './src/theme/Theme';

import { DrawerItems, SafeAreaView } from 'react-navigation';
import ListAds from './src/components/screens/App/Ads/List';
import NewAd from './src/components/screens/App/Ads/New';

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: Theme.COLORS[2],
        paddingVertical: 28,
        paddingLeft: 17,
        alignItems: 'center',
      }}
    >
      <Image source={require('./src/assets/dog.png')} style={styles.icon} />
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
    color: Theme.COLORS[4],
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 9,
    fontSize: 16,
  },
});

const AuthNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Novo cadastro',
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        title: 'Entrar no appet',
      },
    },
  },
  {
    initialRouteName: 'Login',
    headerTintColor: '#000',
    navigationOptions: {
      headerStyle: {
        backgroundColor: Theme.COLORS[2],
      },
      headerTintColor: Theme.COLORS[5],
    }
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Ads: {
      screen: createStackNavigator(
        {
          ListAds: {
            screen: ListAds,
            navigationOptions: {
              title: 'Anúncios',
            },
          },
          AdsNew: {
            screen: NewAd,
            navigationOptions: {
              title: 'Novo anúncio',
            },
          }
        },
        {
          initialRouteName: 'ListAds',
          navigationOptions: {
            headerStyle: {
              backgroundColor: Theme.COLORS[2],
            },
            headerTintColor: Theme.COLORS[5],
          }
        },
      ),
      navigationOptions: {
        title: 'Anúncios',
        drawerIcon: () => (<Icon name="paw" size={25} />),
        headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>,
      },
    },
    Profile: {
      screen: AuthNavigator,
      navigationOptions: {
        title: 'Minha conta',
        drawerIcon: () => (<Icon name="user" size={25} />),
      },
    },
    /* Profile2: {
      screen: Profile,
      navigationOptions: {
        title: 'Minha conta',
        drawerIcon: () => (<Icon name="user" size={25} />),
      },
    }, */
  },
  {
    initialRouteName: 'Ads',
    contentComponent: CustomDrawerContentComponent,
  },
);

const App = createSwitchNavigator(
  {
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'App',
  }
);

export default App;
