import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

import { colors } from '../../commonStyles';
import { RouteNames } from './../../enums/navigationEnums';
import AppContainer from '../../AppContainer';
import LoginScreen from '../../components/LoginScreen';

export const INITIAL_ROUTE = RouteNames.LoginNav;

const headerTitleStyle = {
  color: colors.SECONDARY,
};

// NAVIGATORS
export const MainNavigator = StackNavigator(
  {
    LoginNav: {
      screen: LoginScreen,
    },
  },
  {
    initialRouteName: INITIAL_ROUTE,
  }
);
