import { Dispatch } from 'redux';
import { IAppState } from './ducks/index';
export type ReduxOperationReturnType = (
  dispatch: Dispatch<any>,
  getState: () => IAppState
) => Promise<void>;
