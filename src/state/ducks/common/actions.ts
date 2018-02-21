import { IFluxStandardAction } from '../FluxStandardAction';
import * as types from './types';

export interface IChangeConnectionStatus extends IFluxStandardAction {
  type: types.CHANGE_CONNECTION_STATUS;
  payload: boolean;
}
export interface IIncrementNetworkCalls extends IFluxStandardAction {
  type: types.INCREMENT_NETWORK_CALLS;
}

export type CommonStateAction =
  | IChangeConnectionStatus
  | IIncrementNetworkCalls;

export const setConnectionStatus = (
  connected: boolean
): IChangeConnectionStatus => ({
  type: types.CHANGE_CONNECTION_STATUS,
  payload: connected,
});

export const incrementNetworkCalls = (): IIncrementNetworkCalls => ({
  type: types.INCREMENT_NETWORK_CALLS,
});

export interface ICommonActions {
  setConnectionStatus(connected: boolean);
  incrementNetworkCalls();
}

export default {
  setConnectionStatus,
  incrementNetworkCalls,
};
