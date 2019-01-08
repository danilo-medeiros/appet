import { createStackNavigator } from 'react-navigation';

import { SignUp, EditProfile, ProfileDetails } from '../components/screens/Profile';
import { MainDrawerIcon } from '../components/widgets';
import COLORS from '../theme/Colors';
import { ProfileAdList, AdDetails } from '../components/screens/Ads';

const ProfileNavigator = createStackNavigator(
  {
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: 'Novo cadastro',
      },
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: {
        title: 'Atualizar perfil',
      },
    },
    ProfileDetails: {
      screen: ProfileDetails,
      navigationOptions: ({ navigation }) => ({
        title: 'Minha conta',
        headerLeft: MainDrawerIcon(navigation),
      }),
    },
    ProfileAds: {
      screen: ProfileAdList,
      navigationOptions: {
        title: 'Meus anúncios',
      },
    },
    ShowProfileAd: {
      screen: AdDetails,
      navigationOptions: {
        title: 'Detalhes do anúncio',
      },
    },
  },
  {
    initialRouteName: 'ProfileDetails',
    headerTintColor: '#000',
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLORS[2],
      },
      headerTintColor: COLORS[5],
    }
  }
);

export default ProfileNavigator;
