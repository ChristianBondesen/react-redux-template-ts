import { ICommonState } from './reducers';

export const getCommonViewState = (state: ICommonState) => ({
  numberOfCalls: state.networkCalls,
});
