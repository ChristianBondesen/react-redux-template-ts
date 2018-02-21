import mockStore from 'redux-mock-store';
import * as actions from './../actions';
import * as operations from './../operations';
import { defaultState, ICommonState } from '../reducers';
import { IFluxStandardAction } from '../../FluxStandardAction';

interface InitialStateForTest {
  common: ICommonState;
}

const initial: InitialStateForTest = {
  common: defaultState,
};

describe('Common operations tests', () => {
  beforeEach(() => {
    mockStore().clearActions();
    jest.resetAllMocks();
  });

  it(`dispatches increment call from operation`, async () => {
    const expectedActions: IFluxStandardAction[] = [
      actions.incrementNetworkCalls(),
    ];

    const store = mockStore(initial);
    await store.dispatch(operations.default.asyncOperation());

    // NB: Note that you CAN NOT assert on state using this library, only on which actions has been dispatched to it
    expect(store.getActions()).toEqual(expectedActions);
  });

  it(`dispatches increment call from operation - snapshot example`, async () => {
    const store = mockStore(initial);
    await store.dispatch(operations.default.asyncOperation());
    expect(store.getActions()).toMatchSnapshot();
  });
});
