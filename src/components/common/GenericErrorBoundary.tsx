import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { globalSheet } from '../../commonStyles';
import { IAppState } from '../../state/ducks';

const TAG = 'GenericErrorBoundary';

interface IState {
  hasError: boolean;
}

export interface IGenericErrorBoundaryProps {
  children: any;
  state: IAppState;
}

class GenericErrorBoundary extends React.Component<
  IGenericErrorBoundaryProps,
  IState
> {
  state: IState = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
    // TODO: Report to error service, eg Sentry
  }

  render() {
    if (this.state.hasError) {
      console.log(TAG, `Rendering error screen\n`);
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              globalSheet.subtitle,
              {
                color: 'red',
                textAlign: 'center',
              },
            ]}
          >
            D’oh! Something went wrong - sorry! {'\n'}It’s not you, it’s us.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {},
});

const mapStateToProps = (state: IAppState, ownProps) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(GenericErrorBoundary);
