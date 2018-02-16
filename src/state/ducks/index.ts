import { NavigationState } from 'react-navigation';
import { combineReducers } from 'redux';

import {
  initialState as navDefault,
  navReducer,
} from './../navigation/reducer';
import commonReducer, {
  defaultState as commonDefault,
  ICommonState,
} from './common/reducers';

// import likesReducer, {
//   ILikesState,
//   defaultState as likesDefault,
// } from './likes/reducers';

export interface IAppState {
  common: ICommonState;
  // likes: ILikesState;
  nav: NavigationState;
}

export const appDefaultState: IAppState = {
  common: commonDefault,
  // likes: likesDefault,
  nav: navDefault,
};

// @ts-ignore https://github.com/Microsoft/TypeScript/issues/16795
export const rootReducer = combineReducers({
  nav: navReducer,
  // likes: likesReducer,
  common: commonReducer,
});
