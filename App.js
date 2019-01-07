import React from 'react'
import { createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { CustomDrawerContent } from './src/components/widgets';
import { AdNavigator, ProfileNavigator } from './src/navigators';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
global.FormData = global.originalFormData

const App = createDrawerNavigator({
  Ads: {
    screen: AdNavigator,
    navigationOptions: {
      title: 'Anúncios',
      drawerIcon: () => (<Icon name='paw' size={25} />),
    },
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      title: 'Minha conta',
      drawerIcon: () => (<Icon name='user' size={25} />),
    },
  },
},
{
  initialRouteName: 'Ads',
  contentComponent: CustomDrawerContent,
});

export default App;
