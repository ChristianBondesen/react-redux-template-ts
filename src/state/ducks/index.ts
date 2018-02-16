import commonReducer, {
  ICommonState,
  defaultState as commonDefault,
} from './common/reducers';

import {
  initialState as navDefault,
  navReducer,
} from './../navigation/reducer';

// import likesReducer, {
//   ILikesState,
//   defaultState as likesDefault,
// } from './likes/reducers';

import { IAppState } from './index';
import { combineReducers } from 'redux';

export interface IAppState {
  common: ICommonState;
  // likes: ILikesState;
  nav?: any;
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
