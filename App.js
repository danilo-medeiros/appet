import { createStackNavigator } from 'react-navigation';

import Home from './src/components/screens/Home';
import SignUp from './src/components/screens/SignUp';

const App = createStackNavigator(
  {
    Home: { screen: Home },
    SignUp: { screen: SignUp },
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
