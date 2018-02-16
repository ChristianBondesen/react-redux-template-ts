import * as types from './types';

import {
  ActionMeta,
  AppError,
  IFluxStandardAction,
} from '../FluxStandardAction';

export interface IChangeConnectionStatus extends IFluxStandardAction {
  type: types.CHANGE_CONNECTION_STATUS;
  payload: boolean;
}

export type CommonStateAction =
  | IChangeConnectionStatus
 

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
