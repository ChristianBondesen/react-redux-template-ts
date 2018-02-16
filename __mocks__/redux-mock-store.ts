import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

export default mockStore;
// Idea borrowed from https://blog.callstack.io/unit-testing-react-native-with-the-new-jest-ii-redux-snapshots-for-your-actions-and-reducers-8559f6f8050b
