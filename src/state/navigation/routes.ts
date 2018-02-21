import { StackNavigator, TabBarBottom, TabNavigator } from 'react-navigation';

import { COLORS } from '../../commonStyles';
import { RouteNames } from './../../enums/navigationEnums';
import AppContainer from '../../AppContainer';
import LoginScreen from '../../components/LoginScreen';

export const INITIAL_ROUTE = RouteNames.LoginNav;

const headerTitleStyle = {
  color: COLORS.SECONDARY,
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
