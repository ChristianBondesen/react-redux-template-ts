import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { GLOBAL_STYLES } from '../../commonStyles';

const TAG = 'GenericErrorBoundary';

interface IState {
  hasError: boolean;
}

export interface IGenericErrorBoundaryProps {
  children: any;
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
      return (
        <View style={styles.container}>
          <Text style={[GLOBAL_STYLES.subtitle, styles.text]}>
            D’oh! Something went wrong - sorry! {'\n'}It’s not you, it’s us.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'red',
    textAlign: 'center',
  },
});

export default GenericErrorBoundary;
