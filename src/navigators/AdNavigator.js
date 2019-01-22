import { createStackNavigator } from 'react-navigation';

import { MainDrawerIcon } from '../components/widgets';
import { AdList, NewAd, AdDetails, EditAd, AdListFilter } from '../components/screens/Ads';
import COLORS from "../theme/Colors";

const AdNavigator = createStackNavigator(
  {
    ListAds: {
      screen: AdList,
      navigationOptions: ({ navigation }) => ({
        title: 'Anúncios',
        headerLeft: MainDrawerIcon(navigation),
      }),
    },
    NewAd: {
      screen: NewAd,
      navigationOptions: {
        title: 'Novo anúncio',
      },
    },
    EditAd: {
      screen: EditAd,
      navigationOptions: {
        title: 'Novo anúncio',
      },
    },
    ShowAd: {
      screen: AdDetails,
      navigationOptions: {
        title: 'Detalhes do anúncio',
      },
    },
    AdListFilter: {
      screen: AdListFilter,
      navigationOptions: {
        title: 'Filtrar anúncios',
      },
    }
  },
  {
    initialRouteName: 'ListAds',
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLORS[2],
      },
      headerTintColor: COLORS[5],
    }
  },
);

export default AdNavigator;
