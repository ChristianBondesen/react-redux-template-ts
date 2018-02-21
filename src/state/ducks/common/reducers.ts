import { CommonStateAction } from './actions';
import * as types from './types';

export interface ICommonState {
  isConnected: boolean;
  networkCalls: number;
}

const TAG = 'reducers.ts';

export const defaultState: ICommonState = {
  isConnected: true,
  networkCalls: 0,
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

    case types.INCREMENT_NETWORK_CALLS:
      return {
        ...state,
        networkCalls: state.networkCalls + 1,
      };

    default:
      return state;
  }
};

export default commonReducer;
