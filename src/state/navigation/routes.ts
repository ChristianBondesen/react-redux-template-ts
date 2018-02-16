import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

import { colors } from '../../commonStyles';
// import CreateCampaignEntryContainer from '../../components/campaigns/CreateCampaignEntryContainer';
import { RouteNames } from './../../enums/navigationEnums';
import AppContainer from '../../AppContainer';

export const INITIAL_ROUTE = RouteNames.AppContainer;

const headerTitleStyle = {
  color: colors.SECONDARY,
};

// NAVIGATORS
export const MainNavigator = StackNavigator(
  {
    Main: {
      screen: AppContainer,
    },
  },
  {
    initialRouteName: INITIAL_ROUTE,
  }
);
