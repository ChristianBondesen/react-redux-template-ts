import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { dimensions, GLOBAL_STYLES } from '../../commonStyles';
import { IAppState } from '../../state/ducks';

const TAG = 'NoConnection';

const bannerHeight = 35;
const animationDuration = 300;

export interface INoConnectionBannerProps {
  isConnected: boolean;
}

interface IBannerState {
  height: Animated.Value;
  marginTop: Animated.Value;
}

class NoConnection extends React.Component<
  INoConnectionBannerProps,
  IBannerState
> {
  state: IBannerState = {
    height: new Animated.Value(0),
    marginTop: new Animated.Value(0),
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isConnected) {
      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: bannerHeight,
          duration: animationDuration,
        }),
        Animated.timing(this.state.marginTop, {
          toValue: bannerHeight / 3,
          duration: animationDuration,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: 0,
          duration: animationDuration,
        }),
        Animated.timing(this.state.marginTop, {
          toValue: 0,
          duration: animationDuration,
        }),
      ]).start();
    }
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: this.state.height,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <Animated.Text
          style={[
            GLOBAL_STYLES.breadText,
            styles.text,
            {
              height: this.state.height,
              alignSelf: 'center',
              marginTop: this.state.marginTop,
            },
          ]}
        >
          No network connection
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 12,
    marginHorizontal: dimensions.VIEW_PADDING,
  },
});

const mapStateToProps = (state: IAppState, ownProps) => {
  return {
    isConnected: state.common.isConnected,
  };
};

export default connect(mapStateToProps)(NoConnection);
