import { AppLoading } from 'expo';
import * as React from 'react';
import {
  BackHandler,
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  addNavigationHelpers,
  NavigationActions,
  NavigationState,
} from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { COLORS } from './commonStyles';
import GenericErrorBoundary from './components/common/GenericErrorBoundary';
import NoConnection from './components/common/NoConnection';
import { IAppState } from './state/ducks';
import { commonActions } from './state/ducks/common';
import { ICommonActions } from './state/ducks/common/actions';
import { MainNavigator } from './state/navigation/routes';
import { loadAndCacheAssets } from './utils/cachingUtils';

const TAG = 'AppContainer';

export interface IAppContainerProps {
  nav: NavigationState;
  dispatch;
  actions: ICommonActions;
}

interface IState {
  isReady: boolean;
}

const backhandlerListener = 'hardwareBackPress';
const connectionChangeListener = 'connectionChange';

class AppContainer extends React.Component<IAppContainerProps, IState> {
  state: IState = {
    isReady: false,
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

  render() {
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
    backgroundColor: COLORS.CONTAINER_BACKGROUND_COLOR,
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
