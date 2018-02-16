import { Animated } from 'react-native';

import { CommonStateAction } from './actions';
import * as types from './types';
import { NAVBAR_HEIGHT, STATUS_BAR_HEIGHT } from '../../../commonStyles';

export interface ICommonState {
  isConnected: boolean;
}

const TAG = 'reducers.ts';

export const defaultState: ICommonState = {
  isConnected: true,
};

export const commonReducer = (
  state: ICommonState = defaultState,
  action: CommonStateAction
): ICommonState => {
  switch (action.type) {
    case types.CHANGE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: action.payload,
      };

    default:
      return state;
  }
};

export default commonReducer;
