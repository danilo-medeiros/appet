import { createStackNavigator } from 'react-navigation';

import Home from './src/components/screens/Home';
import SignUp from './src/components/screens/SignUp';
import Login from './src/components/screens/Login';

const App = createStackNavigator(
  {
    Home: { screen: Home },
    SignUp: { screen: SignUp },
    Login: { screen: Login },
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
