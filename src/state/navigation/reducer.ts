import { INITIAL_ROUTE, MainNavigator } from './routes';

const TAG = 'nav reducer.ts';
// @ts-ignore
export const initialState = MainNavigator.router.getStateForAction(
  MainNavigator.router.getActionForPathAndParams(INITIAL_ROUTE)
);

export const navReducer = (state, action) => {
  if (action.type.startsWith('Navigation/')) {
    // ** PREVENT DUBLICATE NAVIGATIONS TO SAME ROUTE **
    const { type, routeName } = action;
    const lastRoute = state.routes[state.routes.length - 1];
    if (routeName === lastRoute.routeName) {
      // If we are already on the screen being navigated to, don't do it
      return state;
    }
  }

  const newState = MainNavigator.router.getStateForAction(action, state);
  return newState || state;
};
