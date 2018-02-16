import { AppLoading, Constants } from 'expo';
import NoConnection from './components/common/NoConnection';
import * as React from 'react';
import {
  AppState,
  BackHandler,
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { addNavigationHelpers, NavigationActions, NavigationStateRoute, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GenericErrorBoundary from './components/common/GenericErrorBoundary';
import { RouteNames } from './enums/navigationEnums';
import { IAppState } from './state/ducks';
import { MainNavigator } from './state/navigation/routes';
import { colors, STATUS_BAR_HEIGHT } from './commonStyles';
import { loadAndCacheAssets } from './utils/cachingUtils';
import { commonActions } from './state/ducks/common';
import { ICommonActions } from './state/ducks/common/actions';

const TAG = 'AppContainer';

export interface IAppContainerProps {
  nav: NavigationState
  dispatch;
  actions: ICommonActions
}

interface IState {
  isReady: boolean;
  appState: string;
  showNewActivityPopup: boolean;
}

const appStateListener = 'change';
const backhandlerListener = 'hardwareBackPress';
const connectionChangeListener = 'connectionChange';

class AppContainer extends React.Component<IAppContainerProps, IState> {
  state: IState = {
    isReady: false,
    appState: AppState.currentState,
    showNewActivityPopup: false,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener(
      connectionChangeListener,
      this.handleConnectivityChange
    );

    BackHandler.addEventListener(backhandlerListener, this.onBackPress);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      connectionChangeListener,
      this.handleConnectivityChange
    );
    BackHandler.removeEventListener(backhandlerListener, this.onBackPress);
  }

  handleConnectivityChange = isConnected => {
    console.log(
      '\nConnectivity change! Now ' +
        (isConnected ? 'online' : 'offline' + '\n')
    );
    this.props.actions.setConnectionStatus(isConnected);
  };

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      // No screens to go back to
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  loadAssets = async () => {
    await loadAndCacheAssets();
  };

  setReady = () => {
    this.setState({ isReady: true });
  };

  handleLoadingError = error => {
    console.warn(error);
    // TODO: Report error
  };

  public render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssets}
          onFinish={this.setReady}
          onError={this.handleLoadingError}
        />
      );
    }

    return (
      <View style={styles.container}>
        <NoConnection />
        <GenericErrorBoundary>
          {Platform.OS === 'ios' && (
            <StatusBar
              barStyle="dark-content"
              backgroundColor="white"
              translucent={false}
            />
          )}

          <MainNavigator
            navigation={addNavigationHelpers({
              dispatch: this.props.dispatch,
              state: this.props.nav,
            })}
          />
        </GenericErrorBoundary>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state: IAppState, ownProps) => {
  return {
    nav: state.nav,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    actions: bindActionCreators(commonActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
