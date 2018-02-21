// tslint:disable-next-line:no-implicit-dependencies
import * as global from 'global';
import {
  createReactNavigationReduxMiddleware,
  createReduxBoundAddListener,
} from 'react-navigation-redux-helpers';
import { applyMiddleware, compose, createStore } from 'redux';
import immutableStateInvariant from 'redux-immutable-state-invariant';
import {
  createMigrate,
  persistReducer,
  purgeStoredState,
  persistStore,
} from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import { rootReducer } from './../state/ducks';
import { migrations } from './migrations';
import { composeWithDevTools } from 'remote-redux-devtools';

const PERSIST_CONFIG_KEY = 'bw-tracking-root';
const PERSIST_VERSION = 0;

// Migrations example/docs: https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
const persistConfig = {
  key: PERSIST_CONFIG_KEY,
  migrate: createMigrate(migrations, { debug: __DEV__ }),
  storage,
  version: PERSIST_VERSION,
};

const reducer = persistReducer(persistConfig, rootReducer);
const TAG = 'store.ts';

// Combine middleware based on env
const sharedMiddleware = [thunk];
const middleware = __DEV__
  ? [immutableStateInvariant(), ...sharedMiddleware]
  : [...sharedMiddleware];

// Build store
export const configureStore = () => {
  const store = getStore(true);

  // Switch the comments below around to clear store
  const persistor = persistStore(store);
  // purgeStoredState(persistConfig);

  return { store };
};

/**
 * Helper method to retrieve a store that can be used by either remotedev.io or React Native debug tools
 * @param reactNativeTools whether or not to use reactNativeDebugTools - if not, we can use remotedev.io/local instaed and use breakpoints in VSCode
 */
const getStore = (reactNativeTools: boolean) => {
  if (reactNativeTools) {
    // *** REACT NATIVE DEBUGGER SETUP ***
    // Short guide on setup: https://medium.com/react-native-development/develop-react-native-redux-applications-like-a-boss-with-this-tool-ec84bed7af8
    const enhancer = compose(
      applyMiddleware(...middleware),
      global.reduxNativeDevTools
        ? global.reduxNativeDevTools(/*options*/)
        : noop => noop
    );

    const store = createStore(reducer, enhancer);
    return store;
  } else {
    // *** REMOTEDEV.IO SETUP ***
    const store = createStore(
      reducer,
      composeWithDevTools(applyMiddleware(...middleware))
    );
    return store;
  }
};
