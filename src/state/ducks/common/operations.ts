import { Dispatch } from 'redux';
import { IAppState } from '../index';
import { ReduxOperationReturnType } from '../../ReduxOperationReturnType';
const TAG = 'common operations.ts';
import * as actions from './actions';

const asyncOperation = () => {
  return async (dispatch: Dispatch<any>, getState: () => IAppState) => {
    const state = getState();
    console.log(TAG, `call echo\n`);

    const uri = 'https://httpbin.org/get';

    dispatch(actions.incrementNetworkCalls());

    // TODO: It would be a good idea to abstract the networking into a seperate class for testing and isolation
    try {
      const result = await fetch(uri);
      if (result.ok) {
        try {
          const json = await result.json();
          // TODO: Do something with JSON
          console.log(TAG, `${JSON.stringify(json)}\n`);
          return json;
        } catch (error) {
          console.log(TAG, `No JSON returned\n`);
          return;
        }
      } else {
        // TODO: Handle result!=ok
      }
    } catch (error) {
      // TODO: Handle error
    }
  };
};

export type ICommonOperations = {
  asyncOperation: () => ReduxOperationReturnType;
};

export default {
  asyncOperation,
};
