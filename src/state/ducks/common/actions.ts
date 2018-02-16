import { IFluxStandardAction } from '../FluxStandardAction';
import * as types from './types';

export interface IChangeConnectionStatus extends IFluxStandardAction {
  type: types.CHANGE_CONNECTION_STATUS;
  payload: boolean;
}

export type CommonStateAction = IChangeConnectionStatus;

export const setConnectionStatus = (
  connected: boolean
): IChangeConnectionStatus => ({
  type: types.CHANGE_CONNECTION_STATUS,
  payload: connected,
});

export interface ICommonActions {
  setConnectionStatus(connected: boolean);
}

export default {
  setConnectionStatus,
};
