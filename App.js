import { createStackNavigator } from 'react-navigation';

import HomeScreen from './src/components/screens/Home';
import UserFormScreen from './src/components/screens/UserForm';

const App = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    NewUser: { screen: UserFormScreen },
  },
  {
    initialRouteName: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#000',
  }
);

export default App;
