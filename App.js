import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import { configureStore } from './dist/store/store';
import AppContainer from './dist/AppContainer';

const store = configureStore().store;

export default class App extends React.Component {
  render() {
    console.log('App.js', 'Rendering provider and AppContainer');
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
