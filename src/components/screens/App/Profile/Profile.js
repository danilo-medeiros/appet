import { createStackNavigator } from 'react-navigation';

import Details from './Details';
import ProfileAds from './Ads/List';
import ProfileEdit from './Edit';
import Theme from '../../../../theme/Theme';

const Profile = createStackNavigator(
  {
    Details: {
      screen: Details,
      navigationOptions: {
        title: 'Minha conta',
        headerStyle: {
          backgroundColor: Theme.COLORS[2],
        },
        headerTintColor: Theme.COLORS[5],
      }
    },
    ProfileAds: {
      screen: ProfileAds,
      navigationOptions: {
        title: 'Meus anúncios',
      }
    },
    ProfileEdit: {
      screen: ProfileEdit,
      navigationOptions: {
        title: 'Atualizar perfil',
      }
    }
  },
  {
    initialRouteName: 'Details',
  },
);

export default Profile;