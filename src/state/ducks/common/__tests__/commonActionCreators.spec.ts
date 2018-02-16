import * as actions from './../actions';
import * as types from './../types';

const TAG = 'commonActionCreators.spec.js';

describe('Common action creators', () => {
  it('should properly create a change action for connection status', () => {
    const expectedActionForFalse = {
      type: types.CHANGE_CONNECTION_STATUS,
      payload: false,
    };
    const expectedActionForTrue = {
      type: types.CHANGE_CONNECTION_STATUS,
      payload: true,
    };
    expect(actions.setConnectionStatus(false)).toEqual(expectedActionForFalse);
    expect(actions.setConnectionStatus(true)).toEqual(expectedActionForTrue);
  });

  it('should properly create a change action for connection status using snapshot', () => {
    expect(actions.setConnectionStatus(false)).toMatchSnapshot();
  });
});
