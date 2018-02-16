import { Dispatch } from 'redux';

import { IAppState } from './ducks';

export type ReduxOperationReturnType = (
  dispatch: Dispatch<any>,
  getState: () => IAppState
) => Promise<void>;
