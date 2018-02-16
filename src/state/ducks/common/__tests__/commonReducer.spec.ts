import * as actions from './../actions';
import { commonReducer, defaultState } from './../reducers';

const TAG = 'commonReducer.spec.ts';

const initialState = defaultState;

describe('Common reducer', () => {
  it('should set connection boolean', () => {
    const action = actions.setConnectionStatus(true);
    expect(commonReducer(undefined, action)).toMatchSnapshot();
  });
});
